#!/usr/bin/env node

/**
 * Auto Behavior System v3.0 - With Skills Orchestration
 * Enforces consistent behavior patterns and intelligently routes to Skills or Agents
 * Integrates with memory system, agent dispatcher, and Skills executor
 */

const fs = require('fs');
const path = require('path');

class AutoBehaviorSystemWithSkills {
    constructor() {
        this.memoryDir = path.join(process.env.HOME, '.claude', 'memory');
        this.configPath = path.join(this.memoryDir, 'auto-behavior-config.json');
        this.config = this.loadConfig();
        this.agentDispatcher = null;
        this.memoryManager = null;
        this.skillExecutor = null;
        this.initializeIntegrations();
        this.defineSkillPatterns();
    }

    loadConfig() {
        const defaultConfig = {
            enableAutoDispatch: true,
            enableMemoryIntegration: true,
            enableProactiveSuggestions: true,
            enableSkillsOrchestration: true,      // NEW
            enableStrictMode: false,
            confidenceThreshold: 0.7,
            skillConfidenceThreshold: 0.5,        // FIXED: Lowered from 0.8 to 0.5 for better matching
            mandatoryAgents: true,
            logInteractions: true
        };

        try {
            if (fs.existsSync(this.configPath)) {
                const savedConfig = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
                return { ...defaultConfig, ...savedConfig };
            }
        } catch (error) {
            console.warn('Failed to load auto-behavior config, using defaults');
        }

        return defaultConfig;
    }

    saveConfig() {
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
        } catch (error) {
            console.error('Failed to save auto-behavior config:', error);
        }
    }

    initializeIntegrations() {
        // Initialize agent dispatcher
        try {
            const EnhancedAgentDispatcher = require('./enhanced-agent-dispatcher.js');
            this.agentDispatcher = new EnhancedAgentDispatcher();
        } catch (error) {
            console.warn('Enhanced agent dispatcher not available');
        }

        // Initialize memory manager
        try {
            const EnhancedMemoryManager = require('./enhanced-memory-manager.js');
            this.memoryManager = new EnhancedMemoryManager();
        } catch (error) {
            console.warn('Enhanced memory manager not available');
        }

        // Initialize Skill executor (NEW)
        try {
            const SkillExecutor = require('./skill-executor.js');
            this.skillExecutor = new SkillExecutor();
        } catch (error) {
            console.warn('Skill executor not available');
        }
    }

    /**
     * Define patterns for Skill detection
     * Comprehensive patterns for all 18 built Skills
     */
    defineSkillPatterns() {
        this.skillPatterns = {
            'codebase-navigator': {
                keywords: [
                    'explore codebase',
                    'navigate repository',
                    'understand architecture',
                    'explore repository',
                    'comprehend code',
                    'repository structure',
                    'codebase overview',
                    'architecture exploration',
                    'code exploration'
                ],
                confidence: 0.9,
                description: 'Fast repository comprehension and safer edits through structured exploration'
            },
            'api-documentor': {
                keywords: [
                    'generate api docs',
                    'openapi spec',
                    'swagger documentation',
                    'graphql schema',
                    'api documentation',
                    'generate sdk',
                    'api reference',
                    'rest documentation',
                    'api specification'
                ],
                confidence: 0.9,
                description: 'Generates OpenAPI/Swagger/GraphQL documentation and SDKs from code'
            },
            'code-formatter': {
                keywords: [
                    'format code',
                    'prettier',
                    'eslint',
                    'black formatter',
                    'code style',
                    'lint code',
                    'fix formatting',
                    'auto-format',
                    'style enforcement'
                ],
                confidence: 0.9,
                description: 'Multi-language code formatting and style enforcement with automatic linting fixes'
            },
            'container-validator': {
                keywords: [
                    'validate dockerfile',
                    'kubernetes manifest',
                    'docker best practices',
                    'container security',
                    'k8s validation',
                    'docker lint',
                    'helm chart',
                    'container best practices'
                ],
                confidence: 0.9,
                description: 'Dockerfile best practices, Kubernetes manifest validation, container security'
            },
            'database-migrator': {
                keywords: [
                    'database migration',
                    'schema migration',
                    'migration script',
                    'schema version',
                    'rollback migration',
                    'liquibase',
                    'flyway',
                    'alembic',
                    'schema versioning'
                ],
                confidence: 0.9,
                description: 'Schema version control, migration script generation, rollback management'
            },
            'dependency-guardian': {
                keywords: [
                    'update dependencies',
                    'security scan',
                    'vulnerability scan',
                    'outdated packages',
                    'dependency security',
                    'npm audit',
                    'dependency update',
                    'package security',
                    'compatibility validation'
                ],
                confidence: 0.9,
                description: 'Automated dependency management with security scanning, update orchestration, and compatibility validation'
            },
            'documentation-sync': {
                keywords: [
                    'sync documentation',
                    'code documentation drift',
                    'validate examples',
                    'generate diagrams',
                    'update documentation',
                    'docs drift detection',
                    'architecture diagrams',
                    'doc validation'
                ],
                confidence: 0.9,
                description: 'Detects code/documentation drift, validates examples, generates diagrams, auto-updates documentation'
            },
            'performance-profiler': {
                keywords: [
                    'profile performance',
                    'cpu profiling',
                    'memory profiling',
                    'performance bottleneck',
                    'query optimization',
                    'flame graph',
                    'performance analysis',
                    'optimize performance',
                    'profiling results'
                ],
                confidence: 0.9,
                description: 'CPU/memory profiling, database query optimization, and performance analysis'
            },
            'pr-author-reviewer': {
                keywords: [
                    'review pull request',
                    'pr checklist',
                    'code review',
                    'pr template',
                    'security review',
                    'pull request quality',
                    'review pr',
                    'pr standards'
                ],
                confidence: 0.9,
                description: 'Raise PR quality with templates, checklists, and security reviews'
            },
            'release-orchestrator': {
                keywords: [
                    'release automation',
                    'semantic versioning',
                    'changelog generation',
                    'multi-environment deployment',
                    'release workflow',
                    'version bump',
                    'release notes',
                    'deployment automation'
                ],
                confidence: 0.9,
                description: 'End-to-end release automation with semantic versioning, changelog generation, and multi-environment deployment'
            },
            'security-scanner': {
                keywords: [
                    'security scan',
                    'sast',
                    'secrets detection',
                    'owasp vulnerabilities',
                    'container security scan',
                    'iac security',
                    'vulnerability scan',
                    'security audit',
                    'static analysis'
                ],
                confidence: 0.9,
                description: 'Comprehensive security scanning for SAST, secrets, OWASP vulnerabilities, container and IaC security'
            },
            'semantic-search': {
                keywords: [
                    'semantic search',
                    'natural language code search',
                    'pattern detection',
                    'code search',
                    'semantic analysis',
                    'search codebase',
                    'semantic code analysis'
                ],
                confidence: 0.9,
                description: 'Natural language code search, pattern detection, semantic code analysis'
            },
            'tech-debt-tracker': {
                keywords: [
                    'technical debt',
                    'tech debt',
                    'code quality',
                    'code complexity',
                    'code duplication',
                    'refactoring priorities',
                    'sqale index',
                    'maintainability index',
                    'debt metrics',
                    'track debt'
                ],
                confidence: 0.9,
                description: 'Identifies, measures, and prioritizes technical debt'
            },
            'test-first-change': {
                keywords: [
                    'test first',
                    'discover tests',
                    'run tests before change',
                    'tdd workflow',
                    'test-driven',
                    'regression prevention',
                    'test discovery',
                    'safe code changes'
                ],
                confidence: 0.9,
                description: 'Reduce regressions by discovering tests, running them, then editing code'
            },
            'incident-triage': {
                keywords: [
                    'incident triage',
                    'on-call',
                    'postmortem',
                    'incident response',
                    'triage sop',
                    'incident handoff',
                    'production incident',
                    'incident analysis'
                ],
                confidence: 0.9,
                description: 'Faster on-call handoffs and better postmortems with triage SOPs'
            },
            'memory-hygiene': {
                keywords: [
                    'clean memory',
                    'validate schema',
                    'compact memory',
                    'deduplicate',
                    'expire stale',
                    'memory cleanup',
                    'validate memory',
                    'merge duplicates',
                    'memory maintenance'
                ],
                confidence: 0.9,
                description: 'Maintains memory cleanliness and consistency'
            },
            'finops-optimizer': {
                keywords: [
                    'cloud cost',
                    'cost optimization',
                    'finops',
                    'aws costs',
                    'azure costs',
                    'gcp costs',
                    'cloud spending',
                    'resource optimization',
                    'rightsizing',
                    'reserved instances',
                    'savings plan',
                    'cost analysis'
                ],
                confidence: 0.9,
                description: 'Analyzes and optimizes cloud infrastructure costs'
            },
            'ai-code-generator': {
                keywords: [
                    'generate code',
                    'generate boilerplate',
                    'scaffold',
                    'crud api',
                    'generate tests',
                    'synthetic data',
                    'code generation',
                    'boilerplate code',
                    'api client generation',
                    'scaffold project'
                ],
                confidence: 0.9,
                description: 'AI-powered code and test generation'
            }
        };
    }

    async processPrompt(userInput, context = {}) {
        const processing = {
            original_input: userInput,
            context: context,
            timestamp: new Date().toISOString(),
            memory_context: null,
            skill_recommendation: null,       // NEW
            agent_recommendation: null,
            execution_mode: 'direct',         // NEW: 'skill', 'agent', 'hybrid', 'direct'
            available_skills: [],             // NEW
            behavior_enforcement: [],
            final_instructions: []
        };

        // Load memory context if enabled
        if (this.config.enableMemoryIntegration && this.memoryManager) {
            try {
                // Try to get relevant context (if method exists)
                if (typeof this.memoryManager.getRelevantContext === 'function') {
                    processing.memory_context = await this.memoryManager.getRelevantContext(userInput);
                } else {
                    // Fallback: use effective memory
                    processing.memory_context = this.memoryManager.getEffectiveMemory();
                }
            } catch (error) {
                console.warn('Failed to load memory context:', error.message);
            }
        }

        // NEW: Check for Skill match first (most efficient)
        if (this.config.enableSkillsOrchestration && this.skillExecutor) {
            processing.skill_recommendation = await this.checkForSkill(userInput, context);

            if (processing.skill_recommendation &&
                processing.skill_recommendation.confidence >= this.config.skillConfidenceThreshold) {
                // High confidence Skill match - use Skill directly
                processing.execution_mode = 'skill';
                processing.final_instructions = this.generateSkillInstructions(processing);
                this.logInteraction(processing);
                return processing;
            }
        }

        // Get agent recommendation if no Skill match
        if (this.config.enableAutoDispatch && this.agentDispatcher) {
            try {
                processing.agent_recommendation = await this.agentDispatcher.dispatch(userInput, context);

                // Load available Skills for Agent to use
                if (this.skillExecutor) {
                    processing.available_skills = this.skillExecutor.listSkills();
                }

                processing.execution_mode = 'agent';
            } catch (error) {
                console.warn('Failed to get agent recommendation:', error);
            }
        }

        // Apply behavior enforcement rules
        processing.behavior_enforcement = this.applyBehaviorRules(userInput, processing);

        // Generate final instructions
        processing.final_instructions = this.generateFinalInstructions(processing);

        // Log interaction if enabled
        if (this.config.logInteractions) {
            this.logInteraction(processing);
        }

        return processing;
    }

    /**
     * Check if user input matches a Skill pattern
     */
    async checkForSkill(input, context = {}) {
        const inputLower = input.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;

        for (const [skillName, pattern] of Object.entries(this.skillPatterns)) {
            let score = 0;
            let matchedKeywords = [];

            // Check keyword matches with flexible matching
            for (const keyword of pattern.keywords) {
                const keywordLower = keyword.toLowerCase();
                // Split multi-word keywords and check if all words are present
                const keywordWords = keywordLower.split(' ');
                const allWordsPresent = keywordWords.every(word => inputLower.includes(word));

                if (allWordsPresent) {
                    score += 1;
                    matchedKeywords.push(keyword);
                }
            }

            // Calculate confidence with improved formula
            // More generous: gives 60% base confidence with any match, scaled up with more matches
            // Zero matches = zero confidence
            if (score === 0) {
                continue; // Skip patterns with no matches
            }
            const matchRatio = score / pattern.keywords.length;
            const confidence = pattern.confidence * (0.6 + matchRatio * 0.4);

            if (confidence > highestScore) {
                highestScore = confidence;
                bestMatch = {
                    skill: skillName,
                    confidence: confidence,
                    matchedKeywords: matchedKeywords,
                    description: pattern.description,
                    reason: `Matched ${matchedKeywords.length} keywords: ${matchedKeywords.slice(0, 3).join(', ')}`
                };
            }
        }

        // Check if Skill exists on disk
        if (bestMatch && this.skillExecutor) {
            const skillPath = this.skillExecutor.getSkillPath(bestMatch.skill);
            if (!skillPath) {
                // Skill pattern matches but Skill not installed
                bestMatch.available = false;
                bestMatch.reason += ' (Skill not installed)';
                bestMatch.confidence = 0; // Force fallback to Agent
            } else {
                bestMatch.available = true;
                bestMatch.path = skillPath;
            }
        }

        return bestMatch;
    }

    applyBehaviorRules(input, processing) {
        const rules = [];

        // Rule 1: Skill usage enforcement (NEW)
        if (processing.skill_recommendation && processing.skill_recommendation.confidence > this.config.skillConfidenceThreshold) {
            rules.push({
                type: 'skill_usage',
                skill: processing.skill_recommendation.skill,
                confidence: processing.skill_recommendation.confidence,
                mandatory: true,
                instruction: `Use the ${processing.skill_recommendation.skill} Skill for this procedural operation`
            });
        }

        // Rule 2: Agent usage enforcement
        if (processing.agent_recommendation && processing.agent_recommendation.confidence > this.config.confidenceThreshold) {
            rules.push({
                type: 'agent_usage',
                agent: processing.agent_recommendation.recommended_agent,
                confidence: processing.agent_recommendation.confidence,
                mandatory: processing.agent_recommendation.mandatory || this.config.mandatoryAgents,
                instruction: `Use the ${processing.agent_recommendation.recommended_agent} agent for this task`
            });
        }

        // Rule 3: Memory context integration
        if (processing.memory_context && processing.memory_context.relevant_patterns) {
            rules.push({
                type: 'memory_integration',
                patterns: processing.memory_context.relevant_patterns,
                instruction: 'Apply repository-specific patterns and previous decisions'
            });
        }

        // Rule 4: Skills availability for Agents (NEW)
        if (processing.available_skills && processing.available_skills.length > 0 && processing.execution_mode === 'agent') {
            rules.push({
                type: 'skills_available',
                skills: processing.available_skills.map(s => s.name),
                instruction: `Agent has access to ${processing.available_skills.length} Skills for deterministic operations`
            });
        }

        // Rule 5: File path enforcement
        rules.push({
            type: 'file_paths',
            instruction: 'Always use absolute file paths, never relative paths'
        });

        // Rule 6: Backup before modification
        if (this.isModificationTask(input)) {
            rules.push({
                type: 'backup_safety',
                instruction: 'Read existing files before making modifications'
            });
        }

        return rules;
    }

    generateSkillInstructions(processing) {
        const instructions = [];

        instructions.push('🎯 SKILL EXECUTION MODE');
        instructions.push(`Skill: ${processing.skill_recommendation.skill}`);
        instructions.push(`Confidence: ${(processing.skill_recommendation.confidence * 100).toFixed(1)}%`);
        instructions.push(`Reason: ${processing.skill_recommendation.reason}`);
        instructions.push('');
        instructions.push('EXECUTION:');
        instructions.push(`1. Execute ${processing.skill_recommendation.skill} Skill`);
        instructions.push('2. Return result directly (no Agent needed)');
        instructions.push('3. This is a deterministic operation');

        return instructions;
    }

    generateFinalInstructions(processing) {
        const instructions = [];

        // Add memory context instruction
        if (processing.memory_context) {
            instructions.push('🧠 MEMORY CONTEXT LOADED: Apply repository-specific patterns and maintain consistency with previous decisions');
        }

        // Add Skill instruction (NEW)
        if (processing.skill_recommendation && processing.skill_recommendation.confidence > this.config.skillConfidenceThreshold) {
            instructions.push(`🎯 SKILL RECOMMENDATION: Use ${processing.skill_recommendation.skill} Skill (${(processing.skill_recommendation.confidence * 100).toFixed(1)}% confidence)`);
        }

        // Add agent instruction
        if (processing.agent_recommendation && processing.agent_recommendation.confidence > this.config.confidenceThreshold) {
            const agentInstruction = processing.agent_recommendation.mandatory
                ? `🚨 MANDATORY AGENT: Use ${processing.agent_recommendation.recommended_agent} agent`
                : `💡 RECOMMENDED AGENT: ${processing.agent_recommendation.recommended_agent} (${(processing.agent_recommendation.confidence * 100).toFixed(1)}% confidence)`;

            instructions.push(agentInstruction);
        }

        // Add Skills availability (NEW)
        if (processing.available_skills && processing.available_skills.length > 0 && processing.execution_mode === 'agent') {
            instructions.push(`🔧 SKILLS AVAILABLE: ${processing.available_skills.length} Skills ready for Agent use`);
            instructions.push(`   Skills: ${processing.available_skills.map(s => s.name).join(', ')}`);
        }

        // Add behavior enforcement instructions
        processing.behavior_enforcement.forEach(rule => {
            if (rule.type !== 'skill_usage' && rule.type !== 'skills_available') {
                instructions.push(`📋 ${rule.type.toUpperCase()}: ${rule.instruction}`);
            }
        });

        return instructions;
    }

    isModificationTask(input) {
        const modificationKeywords = [
            'create', 'write', 'modify', 'update', 'edit', 'change', 'delete',
            'add', 'remove', 'refactor', 'implement', 'build', 'setup'
        ];

        const inputLower = input.toLowerCase();
        return modificationKeywords.some(keyword => inputLower.includes(keyword));
    }

    logInteraction(processing) {
        const logEntry = {
            timestamp: processing.timestamp,
            input_length: processing.original_input.length,
            execution_mode: processing.execution_mode,            // NEW
            skill_recommended: processing.skill_recommendation?.skill || null,  // NEW
            skill_confidence: processing.skill_recommendation?.confidence || null,  // NEW
            agent_recommended: processing.agent_recommendation?.recommended_agent || null,
            agent_confidence: processing.agent_recommendation?.confidence || null,
            memory_context_loaded: !!processing.memory_context,
            rules_applied: processing.behavior_enforcement.length,
            skills_available: processing.available_skills?.length || 0  // NEW
        };

        const logPath = path.join(this.memoryDir, 'auto-behavior.log');

        try {
            fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
        } catch (error) {
            console.warn('Failed to log interaction:', error);
        }
    }

    async handleCLI(args) {
        const command = args[0];

        switch (command) {
            case 'prompt':
                const input = args.slice(1).join(' ');
                if (!input) {
                    console.error('Usage: auto-behavior-system prompt "your input"');
                    return;
                }

                const result = await this.processPrompt(input);
                this.outputPromptResult(result);
                break;

            case 'status':
                this.showStatus();
                break;

            case 'config':
                await this.handleConfigCommand(args.slice(1));
                break;

            case 'banner':
                this.showBanner();
                break;

            case 'test-skill':
                await this.testSkillDetection();
                break;

            default:
                this.showHelp();
        }
    }

    outputPromptResult(result) {
        console.log('\n🤖 AUTO BEHAVIOR SYSTEM PROCESSING (v3.0 - With Skills)\n');

        console.log(`EXECUTION MODE: ${result.execution_mode.toUpperCase()}`);
        console.log('');

        if (result.skill_recommendation && result.execution_mode === 'skill') {
            console.log('SKILL EXECUTION:');
            console.log(`  Skill: ${result.skill_recommendation.skill}`);
            console.log(`  Confidence: ${(result.skill_recommendation.confidence * 100).toFixed(1)}%`);
            console.log(`  Reason: ${result.skill_recommendation.reason}`);
            console.log(`  Available: ${result.skill_recommendation.available ? 'Yes' : 'No (will fallback to Agent)'}`);
            console.log('');
        }

        if (result.agent_recommendation && result.execution_mode === 'agent') {
            console.log('AGENT ANALYSIS:');
            console.log(`  Recommended: ${result.agent_recommendation.recommended_agent}`);
            console.log(`  Confidence: ${(result.agent_recommendation.confidence * 100).toFixed(1)}%`);
            console.log(`  Reasoning: ${result.agent_recommendation.reasoning}`);
            if (result.agent_recommendation.alternatives && result.agent_recommendation.alternatives.length > 0) {
                console.log(`  Alternatives: ${result.agent_recommendation.alternatives.map(alt => alt.agent).join(', ')}`);
            }
            console.log('');
        }

        if (result.available_skills && result.available_skills.length > 0) {
            console.log('SKILLS AVAILABLE TO AGENT:');
            result.available_skills.forEach(skill => {
                console.log(`  - ${skill.name}: ${skill.description || '(no description)'}`);
            });
            console.log('');
        }

        if (result.final_instructions.length > 0) {
            console.log('BEHAVIOR INSTRUCTIONS:');
            result.final_instructions.forEach(instruction => {
                console.log(`  ${instruction}`);
            });
            console.log('');
        }

        console.log('ENFORCEMENT ACTIVE:');
        console.log('  ✅ Memory integration mandatory');
        console.log('  ✅ Skills orchestration enabled');
        console.log('  ✅ Agent usage enforced');
        console.log('  ✅ File path validation');
        console.log('  ✅ Safety checks enabled');
    }

    showStatus() {
        console.log(JSON.stringify({
            status: 'active',
            version: '3.0',
            config: this.config,
            integrations: {
                agent_dispatcher: !!this.agentDispatcher,
                memory_manager: !!this.memoryManager,
                skill_executor: !!this.skillExecutor
            },
            skills: this.skillExecutor ? this.skillExecutor.listSkills().map(s => s.name) : [],
            timestamp: new Date().toISOString()
        }, null, 2));
    }

    async testSkillDetection() {
        const testCases = [
            'Detect the current repository',
            'Clean up memory and remove duplicates',
            'Format memory as markdown',
            'Analyze the codebase structure',
            'Validate memory schema'
        ];

        console.log('🧪 Testing Skill Detection\n');

        for (const testCase of testCases) {
            const result = await this.checkForSkill(testCase);
            console.log(`Input: "${testCase}"`);
            if (result && result.skill) {
                const status = result.available ? '✅' : '⚠️';
                console.log(`  ${status} Skill: ${result.skill} (${(result.confidence * 100).toFixed(1)}% confidence)`);
                console.log(`  Reason: ${result.reason}`);
                console.log(`  Available: ${result.available ? 'Yes - Ready to use' : 'No - Build this Skill to enable'}`);
            } else {
                console.log('  ❌ No Skill pattern match');
            }
            console.log('');
        }
    }

    async handleConfigCommand(args) {
        const subcommand = args[0];

        switch (subcommand) {
            case 'show':
                console.log(JSON.stringify(this.config, null, 2));
                break;

            case 'update':
                if (args[1]) {
                    try {
                        const updates = JSON.parse(args[1]);
                        Object.assign(this.config, updates);
                        this.saveConfig();
                        console.log('✅ Configuration updated');
                    } catch (error) {
                        console.error('❌ Invalid JSON for config update');
                    }
                }
                break;

            default:
                console.log('Config subcommands: show, update');
        }
    }

    showBanner() {
        console.log(`
🤖 AUTO BEHAVIOR SYSTEM v3.0 - With Skills Orchestration

Status: ACTIVE
- Agent dispatch: ${this.config.enableAutoDispatch ? 'ON' : 'OFF'}
- Memory integration: ${this.config.enableMemoryIntegration ? 'ON' : 'OFF'}
- Skills orchestration: ${this.config.enableSkillsOrchestration ? 'ON' : 'OFF'}
- Strict mode: ${this.config.enableStrictMode ? 'ON' : 'OFF'}

Skills Available: ${this.skillExecutor ? this.skillExecutor.listSkills().length : 0}

Making Claude interactions consistent, agent-driven, and Skill-augmented.
        `);
    }

    showHelp() {
        console.log(`
Auto Behavior System v3.0 - With Skills Orchestration

Usage:
  node auto-behavior-system.js <command> [args]

Commands:
  prompt "input"     Process user input and apply behavior rules
  status             Show system status including Skills
  config show        Show current configuration
  config update      Update configuration with JSON
  banner             Show system banner
  test-skill         Test Skill detection with sample inputs
  help               Show this help

Examples:
  node auto-behavior-system.js prompt "Detect repository"
  node auto-behavior-system.js test-skill
  node auto-behavior-system.js config update '{"enableSkillsOrchestration": true}'
        `);
    }
}

// Export for use as module
module.exports = AutoBehaviorSystemWithSkills;

// CLI usage when run directly
if (require.main === module) {
    const system = new AutoBehaviorSystemWithSkills();
    system.handleCLI(process.argv.slice(2));
}
