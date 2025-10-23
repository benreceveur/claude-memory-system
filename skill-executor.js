#!/usr/bin/env node

/**
 * Skill Executor v3.0
 * Executes Claude Code Skills with validation, caching, and logging
 * Integrates with the Auto Behavior System and Agent Dispatcher
 */

const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');

class SkillExecutor {
  constructor() {
    this.skillsDir = path.join(process.env.HOME, '.claude', 'skills');
    this.cacheDir = path.join('/tmp', 'claude-skills-cache');
    this.logFile = path.join(process.env.HOME, '.claude', 'memory', 'skill-execution.log');
    this.cacheTTL = 5 * 60 * 1000; // 5 minutes
    this.maxConcurrent = 3;
    this.currentExecutions = 0;

    this.ensureDirectories();
  }

  ensureDirectories() {
    // Ensure skills directory exists
    if (!fs.existsSync(this.skillsDir)) {
      fs.mkdirSync(this.skillsDir, { recursive: true });
    }

    // Ensure cache directory exists
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }

    // Ensure log directory exists
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  /**
   * List all available skills
   * @returns {Array} Array of skill objects with name and path
   */
  listSkills() {
    try {
      const skills = [];

      // Recursively find all SKILL.md files
      const findSkills = (dir) => {
        if (!fs.existsSync(dir)) return;

        const items = fs.readdirSync(dir);

        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            // Check if this directory contains a SKILL.md
            const skillFile = path.join(fullPath, 'SKILL.md');
            if (fs.existsSync(skillFile)) {
              skills.push({
                name: item,
                path: fullPath,
                skillFile: skillFile,
                category: path.relative(this.skillsDir, path.dirname(fullPath))
              });
            }

            // Recurse into subdirectories
            findSkills(fullPath);
          }
        }
      };

      findSkills(this.skillsDir);
      return skills;

    } catch (error) {
      this.log('error', `Failed to list skills: ${error.message}`);
      return [];
    }
  }

  /**
   * Get skill metadata from SKILL.md file
   * @param {string} skillName - Name of the skill
   * @returns {Object} Skill metadata
   */
  getSkillMetadata(skillName) {
    try {
      const skills = this.listSkills();
      const skill = skills.find(s => s.name === skillName);

      if (!skill) {
        return null;
      }

      const content = fs.readFileSync(skill.skillFile, 'utf8');

      // Parse metadata from SKILL.md
      const metadata = {
        name: skillName,
        path: skill.path,
        description: '',
        usage: '',
        examples: [],
        dependencies: [],
        category: skill.category
      };

      // Extract description (first paragraph)
      const descMatch = content.match(/##?\s*Description\s*\n\n([\s\S]*?)(?=\n##|\n---|$)/i);
      if (descMatch) {
        metadata.description = descMatch[1].trim();
      }

      // Extract usage
      const usageMatch = content.match(/##?\s*Usage\s*\n\n([\s\S]*?)(?=\n##|\n---|$)/i);
      if (usageMatch) {
        metadata.usage = usageMatch[1].trim();
      }

      return metadata;

    } catch (error) {
      this.log('error', `Failed to get metadata for ${skillName}: ${error.message}`);
      return null;
    }
  }

  /**
   * Get skill path if it exists
   * @param {string} skillName - Name of the skill
   * @returns {string|null} Path to skill or null if not found
   */
  getSkillPath(skillName) {
    try {
      const skills = this.listSkills();
      const skill = skills.find(s => s.name === skillName);
      return skill ? skill.path : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Execute a skill
   * @param {string} skillName - Name of the skill to execute
   * @param {Object} params - Parameters for the skill
   * @param {Object} options - Execution options
   * @returns {Promise<Object>} Execution result
   */
  async execute(skillName, params = {}, options = {}) {
    const startTime = Date.now();

    try {
      // Check concurrent execution limit
      if (this.currentExecutions >= this.maxConcurrent) {
        throw new Error('Maximum concurrent skill executions reached');
      }

      this.currentExecutions++;

      // Find the skill
      const skills = this.listSkills();
      const skill = skills.find(s => s.name === skillName);

      if (!skill) {
        throw new Error(`Skill '${skillName}' not found`);
      }

      // Check cache if enabled
      if (options.useCache !== false) {
        const cached = this.getFromCache(skillName, params);
        if (cached) {
          this.log('info', `Cache hit for skill: ${skillName}`);
          return {
            success: true,
            cached: true,
            result: cached,
            executionTimeMs: Date.now() - startTime
          };
        }
      }

      // Validate path (security check)
      if (!this.isValidPath(skill.path)) {
        throw new Error(`Invalid skill path: ${skill.path}`);
      }

      // Execute the skill
      const result = await this.executeSkill(skill, params, options);

      // Cache the result
      if (options.useCache !== false && result.success) {
        this.saveToCache(skillName, params, result.output);
      }

      // Log execution
      this.log('info', `Skill executed: ${skillName}`, {
        success: result.success,
        executionTimeMs: Date.now() - startTime,
        params
      });

      this.currentExecutions--;

      return {
        success: result.success,
        cached: false,
        result: result.output,
        error: result.error,
        executionTimeMs: Date.now() - startTime
      };

    } catch (error) {
      this.currentExecutions--;

      this.log('error', `Skill execution failed: ${skillName}`, {
        error: error.message,
        executionTimeMs: Date.now() - startTime
      });

      return {
        success: false,
        cached: false,
        error: error.message,
        executionTimeMs: Date.now() - startTime
      };
    }
  }

  /**
   * Execute a skill by running its main script
   * @param {Object} skill - Skill object
   * @param {Object} params - Parameters
   * @param {Object} options - Options
   * @returns {Promise<Object>} Execution result
   */
  async executeSkill(skill, params, options) {
    return new Promise((resolve) => {
      try {
        // Look for execution script
        const scriptPaths = [
          path.join(skill.path, 'scripts', 'main.py'),
          path.join(skill.path, 'scripts', 'main.js'),
          path.join(skill.path, 'scripts', 'main.sh'),
          path.join(skill.path, 'main.py'),
          path.join(skill.path, 'main.js'),
          path.join(skill.path, 'main.sh')
        ];

        let scriptPath = null;
        let scriptType = null;

        for (const sp of scriptPaths) {
          if (fs.existsSync(sp)) {
            scriptPath = sp;
            scriptType = path.extname(sp);
            break;
          }
        }

        if (!scriptPath) {
          // No executable script found - return skill metadata as documentation
          const metadata = this.getSkillMetadata(skill.name);
          resolve({
            success: true,
            output: {
              type: 'documentation',
              skill: skill.name,
              metadata: metadata,
              message: 'Skill provides guidance and best practices (no executable script)'
            }
          });
          return;
        }

        // Prepare command based on script type
        let command;
        const paramsJson = JSON.stringify(params);

        switch (scriptType) {
          case '.py':
            command = `python3 "${scriptPath}" '${paramsJson}'`;
            break;
          case '.js':
            command = `node "${scriptPath}" '${paramsJson}'`;
            break;
          case '.sh':
            command = `bash "${scriptPath}" '${paramsJson}'`;
            break;
          default:
            throw new Error(`Unsupported script type: ${scriptType}`);
        }

        // Execute with timeout
        const timeout = options.timeout || 30000; // 30 seconds default

        exec(command, { timeout, cwd: skill.path }, (error, stdout, stderr) => {
          if (error) {
            resolve({
              success: false,
              error: error.message,
              stderr: stderr
            });
          } else {
            try {
              // Try to parse JSON output
              const output = JSON.parse(stdout);
              resolve({
                success: true,
                output: output
              });
            } catch (e) {
              // Return raw output if not JSON
              resolve({
                success: true,
                output: {
                  type: 'text',
                  content: stdout.trim()
                }
              });
            }
          }
        });

      } catch (error) {
        resolve({
          success: false,
          error: error.message
        });
      }
    });
  }

  /**
   * Validate skill path (prevent path traversal attacks)
   * @param {string} skillPath - Path to validate
   * @returns {boolean} True if valid
   */
  isValidPath(skillPath) {
    const normalized = path.normalize(skillPath);
    const skillsNormalized = path.normalize(this.skillsDir);
    return normalized.startsWith(skillsNormalized);
  }

  /**
   * Get cached result if available and not expired
   * @param {string} skillName - Skill name
   * @param {Object} params - Parameters
   * @returns {any} Cached result or null
   */
  getFromCache(skillName, params) {
    try {
      const cacheKey = this.getCacheKey(skillName, params);
      const cachePath = path.join(this.cacheDir, cacheKey);

      if (!fs.existsSync(cachePath)) {
        return null;
      }

      const stat = fs.statSync(cachePath);
      const age = Date.now() - stat.mtimeMs;

      if (age > this.cacheTTL) {
        // Cache expired, delete it
        fs.unlinkSync(cachePath);
        return null;
      }

      const content = fs.readFileSync(cachePath, 'utf8');
      return JSON.parse(content);

    } catch (error) {
      return null;
    }
  }

  /**
   * Save result to cache
   * @param {string} skillName - Skill name
   * @param {Object} params - Parameters
   * @param {any} result - Result to cache
   */
  saveToCache(skillName, params, result) {
    try {
      const cacheKey = this.getCacheKey(skillName, params);
      const cachePath = path.join(this.cacheDir, cacheKey);

      fs.writeFileSync(cachePath, JSON.stringify(result));

    } catch (error) {
      // Cache write failure is non-critical
      this.log('warn', `Failed to write cache: ${error.message}`);
    }
  }

  /**
   * Generate cache key from skill name and params
   * @param {string} skillName - Skill name
   * @param {Object} params - Parameters
   * @returns {string} Cache key
   */
  getCacheKey(skillName, params) {
    const crypto = require('crypto');
    const hash = crypto.createHash('md5');
    hash.update(skillName + JSON.stringify(params));
    return hash.digest('hex');
  }

  /**
   * Log execution events
   * @param {string} level - Log level (info, warn, error)
   * @param {string} message - Log message
   * @param {Object} data - Additional data
   */
  log(level, message, data = {}) {
    try {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: level,
        message: message,
        ...data
      };

      const logLine = JSON.stringify(logEntry) + '\n';
      fs.appendFileSync(this.logFile, logLine);

    } catch (error) {
      // Logging failure is non-critical
      console.error('Failed to write log:', error.message);
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    try {
      if (fs.existsSync(this.cacheDir)) {
        const files = fs.readdirSync(this.cacheDir);
        for (const file of files) {
          fs.unlinkSync(path.join(this.cacheDir, file));
        }
      }
      this.log('info', 'Cache cleared');
      return true;
    } catch (error) {
      this.log('error', `Failed to clear cache: ${error.message}`);
      return false;
    }
  }
}

// CLI interface
if (require.main === module) {
  const executor = new SkillExecutor();
  const command = process.argv[2];

  switch (command) {
    case 'list':
      const skills = executor.listSkills();
      console.log(JSON.stringify(skills, null, 2));
      break;

    case 'info':
      const skillName = process.argv[3];
      if (!skillName) {
        console.error('Usage: skill-executor.js info <skill-name>');
        process.exit(1);
      }
      const metadata = executor.getSkillMetadata(skillName);
      console.log(JSON.stringify(metadata, null, 2));
      break;

    case 'execute':
      const execSkillName = process.argv[3];
      const paramsJson = process.argv[4] || '{}';
      if (!execSkillName) {
        console.error('Usage: skill-executor.js execute <skill-name> [params-json]');
        process.exit(1);
      }
      executor.execute(execSkillName, JSON.parse(paramsJson))
        .then(result => {
          console.log(JSON.stringify(result, null, 2));
          process.exit(result.success ? 0 : 1);
        })
        .catch(error => {
          console.error('Execution error:', error);
          process.exit(1);
        });
      break;

    case 'clear-cache':
      executor.clearCache();
      console.log('Cache cleared');
      break;

    default:
      console.log('Claude Skills Executor v3.0');
      console.log('');
      console.log('Usage:');
      console.log('  skill-executor.js list                          - List all skills');
      console.log('  skill-executor.js info <skill-name>             - Show skill info');
      console.log('  skill-executor.js execute <skill-name> [params] - Execute a skill');
      console.log('  skill-executor.js clear-cache                   - Clear cache');
  }
}

module.exports = SkillExecutor;
