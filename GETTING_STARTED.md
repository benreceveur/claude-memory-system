# Getting Started Guide

**Get up and running with Claude Memory System in 5 minutes**

This guide will walk you through installing, configuring, and using the Claude Memory System with Skills orchestration.

---

## What You'll Learn

- ✅ How to install the memory system
- ✅ How to verify it's working
- ✅ How to use Skills vs Agents
- ✅ How to configure patterns
- ✅ Common use cases and examples

**Time Required**: 5-10 minutes

---

## Prerequisites

Before you begin, make sure you have:

- ✅ **Claude Code CLI** installed and working
- ✅ **Node.js 16+** (`node --version`)
- ✅ **Git** (`git --version`)
- ✅ **Terminal access** (Bash or Zsh)

---

## Step 1: Installation

### Option A: Clone from GitHub (Recommended)

```bash
# Navigate to your Claude directory
cd ~/.claude

# Clone the repository
git clone https://github.com/benreceveur/claude-memory-system.git memory

# Verify installation
ls -la ~/.claude/memory
```

### Option B: Download ZIP

```bash
# Download and extract
curl -L https://github.com/benreceveur/claude-memory-system/archive/main.zip -o memory.zip
unzip memory.zip -d ~/.claude/
mv ~/.claude/claude-memory-system-main ~/.claude/memory

# Verify installation
ls -la ~/.claude/memory
```

### Verification

You should see these key files:
```
~/.claude/memory/
├── auto-behavior-system.js
├── enhanced-agent-dispatcher.js
├── skill-executor.js
├── enhanced-memory-manager.js
├── memory-loader.sh
└── README.md
```

---

## Step 2: Initial Configuration

### Check System Status

```bash
cd ~/.claude/memory

# Check if everything is installed
node auto-behavior-system.js status
```

**Expected Output**:
```json
{
  "status": "active",
  "version": "3.0",
  "config": {
    "enableSkillsOrchestration": true,
    "skillConfidenceThreshold": 0.5
  },
  "integrations": {
    "agent_dispatcher": true,
    "memory_manager": true,
    "skill_executor": true
  },
  "skills": ["tech-debt-tracker", "code-formatter", ...]
}
```

### Test Skills Detection

```bash
# Run built-in tests
node auto-behavior-system.js test-skill
```

**Expected Output**:
```
🧪 Testing Skill Detection

Input: "Clean up memory and remove duplicates"
  ✅ Skill: memory-hygiene (58.0% confidence)
  Available: Yes - Ready to use
```

---

## Step 3: Understanding Skills vs Agents

The system automatically routes tasks to either Skills or Agents based on the type of work needed.

### Skills (Deterministic Operations)

**When to use**: Procedural tasks with clear steps

```bash
# Example 1: Code formatting
Input: "Format my code with prettier"
→ Routes to: code-formatter Skill
→ Executes in: <1 second
→ Tokens used: ~350

# Example 2: Tech debt analysis
Input: "Track technical debt in my codebase"
→ Routes to: tech-debt-tracker Skill
→ Executes in: <1 second
→ Tokens used: ~350

# Example 3: PR review
Input: "Review my pull request for security issues"
→ Routes to: pr-author-reviewer Skill
→ Executes in: <1 second
→ Tokens used: ~350
```

### Agents (Autonomous Tasks)

**When to use**: Complex analysis, recommendations, design

```bash
# Example 1: Architecture design
Input: "Design a scalable microservices architecture"
→ Routes to: backend-architect Agent
→ Executes in: 20-30 seconds
→ Tokens used: ~20,000

# Example 2: Bug investigation
Input: "Investigate this authentication bug"
→ Routes to: debugger Agent
→ Executes in: 20-30 seconds
→ Tokens used: ~20,000
```

**Key Difference**:
- **Skills**: Fast, deterministic, procedural (98% token savings)
- **Agents**: Autonomous, analytical, strategic (full AI capabilities)

---

## Step 4: Your First Skill Execution

Let's test the system with a real example:

### Test 1: Memory Cleanup

```bash
# In Claude Code, type this message:
"Clean up my memory and remove any duplicates"

# The system will:
# 1. Detect the memory-hygiene Skill
# 2. Show confidence score (~58%)
# 3. Execute the Skill
# 4. Return results in <1 second
```

### Test 2: Code Formatting

```bash
# In Claude Code:
"Format all my TypeScript files with prettier"

# The system will:
# 1. Detect the code-formatter Skill
# 2. Execute formatting
# 3. Apply configured style rules
# 4. Return results quickly
```

### Test 3: Tech Debt Tracking

```bash
# In Claude Code:
"Analyze technical debt in my codebase"

# The system will:
# 1. Detect the tech-debt-tracker Skill
# 2. Scan for code quality issues
# 3. Generate metrics and recommendations
# 4. Return comprehensive report
```

---

## Step 5: Viewing Available Skills

### List All Skills

```bash
cd ~/.claude/memory
node skill-executor.js list
```

**Output**:
```json
[
  {
    "name": "tech-debt-tracker",
    "path": "/Users/.../.claude/skills/tech-debt-tracker"
  },
  {
    "name": "code-formatter",
    "path": "/Users/.../.claude/skills/code-formatter"
  },
  ...
]
```

### Check Specific Skill

```bash
# Get info about a specific Skill
ls -la ~/.claude/skills/tech-debt-tracker/
cat ~/.claude/skills/tech-debt-tracker/SKILL.md
```

---

## Step 6: Configuration

### Global Configuration

Edit your global memory patterns:

```bash
# Open global config
nano ~/.claude/memory/global-memory.json
```

**Example configuration**:
```json
{
  "patterns": {
    "code_style": {
      "indentation": "2_spaces",
      "quotes": "single",
      "semicolons": true
    },
    "frameworks": {
      "testing": "jest",
      "linting": "eslint",
      "formatter": "prettier"
    }
  },
  "agents": {
    "frontend-developer": {
      "patterns": ["react", "component", "ui", "interface"]
    },
    "backend-engineer": {
      "patterns": ["api", "server", "database", "backend"]
    }
  }
}
```

### System Configuration

Adjust Skills orchestration settings:

```bash
# View current config
node auto-behavior-system.js config show

# Update skill confidence threshold (if needed)
node auto-behavior-system.js config update '{"skillConfidenceThreshold": 0.6}'
```

**Configuration Options**:
```javascript
{
  enableSkillsOrchestration: true,    // Enable Skills routing
  skillConfidenceThreshold: 0.5,      // 50% minimum confidence
  confidenceThreshold: 0.7,           // 70% for Agents
  enableAutoDispatch: true,           // Auto agent routing
  enableMemoryIntegration: true,      // Repository memory
  mandatoryAgents: true              // Enforce agent usage when needed
}
```

---

## Step 7: Working with Repositories

The memory system automatically detects Git repositories and maintains repository-specific context.

### In a Git Repository

```bash
# Navigate to your project
cd ~/my-project

# Start Claude Code
# Memory system automatically:
# 1. Detects repository
# 2. Loads repository-specific patterns
# 3. Applies custom configurations
# 4. Maintains session continuity
```

### Repository-Specific Patterns

The system stores patterns per repository:

```bash
# View repository memory
node ~/.claude/memory/enhanced-memory-manager.js info

# Check repository detection
node ~/.claude/memory/repo-detector.js
```

### Global vs Repository Patterns

```
Priority Order:
1. Repository Overrides (highest)
2. Repository Patterns
3. Global Patterns (lowest)

Example:
If global says "testing: jest"
And repo says "testing: vitest"
→ Uses "testing: vitest" for that repository
```

---

## Step 8: Monitoring & Debugging

### View Logs

```bash
# Skills execution log
tail -f ~/.claude/memory/skill-execution.log

# Auto behavior decisions
tail -f ~/.claude/memory/auto-behavior.log

# Agent dispatch log
tail -f ~/.claude/memory/agent-dispatch.log
```

### Check Statistics

```bash
# Count Skill executions
grep -c '"execution_mode":"skill"' ~/.claude/memory/auto-behavior.log

# Count Agent executions
grep -c '"execution_mode":"agent"' ~/.claude/memory/auto-behavior.log

# View success rate
grep '"success":true' ~/.claude/memory/skill-execution.log | wc -l
```

### Debug Mode

```bash
# Enable debug output
export AGENT_DEBUG=true

# Test with debug info
node enhanced-agent-dispatcher.js analyze "test input"
```

---

## Common Use Cases

### Use Case 1: Code Quality Check

**Scenario**: You want to check code quality before committing

```bash
# In Claude Code:
"Track technical debt and code quality issues"

# System Response:
# ✅ Detects tech-debt-tracker Skill (58% confidence)
# ✅ Executes analysis in <1 second
# ✅ Returns:
#    - Code complexity metrics
#    - Duplication analysis
#    - Maintainability index
#    - Refactoring priorities
```

### Use Case 2: Pre-Commit Formatting

**Scenario**: Format code before committing

```bash
# In Claude Code:
"Format all my code files with prettier"

# System Response:
# ✅ Detects code-formatter Skill (58% confidence)
# ✅ Applies Prettier to all supported files
# ✅ Runs ESLint with auto-fix
# ✅ Returns formatting summary
```

### Use Case 3: PR Preparation

**Scenario**: Prepare a pull request with quality checks

```bash
# In Claude Code:
"Review my PR and check for security issues"

# System Response:
# ✅ Detects pr-author-reviewer Skill (63% confidence)
# ✅ Runs PR checklist validation
# ✅ Performs security review
# ✅ Generates PR template with findings
```

### Use Case 4: Cloud Cost Analysis

**Scenario**: Optimize cloud spending

```bash
# In Claude Code:
"Analyze my AWS costs and suggest optimizations"

# System Response:
# ✅ Detects finops-optimizer Skill
# ✅ Analyzes resource usage
# ✅ Identifies cost-saving opportunities
# ✅ Provides rightsizing recommendations
```

---

## Troubleshooting

### Issue: Skills Not Activating

**Symptom**: All tasks route to Agents instead of Skills

**Solution**:
```bash
# Check Skills threshold
node auto-behavior-system.js status
# Look for: skillConfidenceThreshold

# If too high (>0.5), lower it:
node auto-behavior-system.js config update '{"skillConfidenceThreshold": 0.5}'

# Test again
node auto-behavior-system.js test-skill
```

### Issue: Memory Not Loading

**Symptom**: Repository context not recognized

**Solution**:
```bash
# Verify memory loader
bash ~/.claude/memory/memory-loader.sh

# Check repository detection
node ~/.claude/memory/repo-detector.js

# Validate JSON
cat ~/.claude/memory/global-memory.json | jq .
```

### Issue: Skills Don't Exist

**Symptom**: "Skill not found" errors

**Solution**:
```bash
# Check if Skills are installed
ls -la ~/.claude/skills/

# If empty, Skills need to be built separately
# (Skills are custom tools you create)

# For now, the system will fall back to Agents
```

---

## Next Steps

### 1. Explore Skills

Browse the [Skills Guide](./SKILLS_GUIDE.md) to learn about all 18 available Skills and how to use them.

### 2. Customize Patterns

Add your own project-specific patterns:

```bash
# Edit global memory
nano ~/.claude/memory/global-memory.json

# Add custom patterns, agent preferences, enforcement rules
```

### 3. Build Custom Skills

Create your own Skills for project-specific tasks:

```bash
# Skills structure
~/.claude/skills/your-skill/
├── SKILL.md           # Metadata and documentation
├── scripts/
│   └── main.py       # Execution script
└── README.md         # Usage instructions
```

### 4. Review Architecture

Understand the system design by reading [ARCHITECTURE.md](./ARCHITECTURE.md).

### 5. Join the Community

- ⭐ [Star on GitHub](https://github.com/benreceveur/claude-memory-system)
- 🐛 [Report Issues](https://github.com/benreceveur/claude-memory-system/issues)
- 💡 [Request Features](https://github.com/benreceveur/claude-memory-system/issues)
- 💬 [Join Discussions](https://github.com/benreceveur/claude-memory-system/discussions)

---

## Quick Reference Card

### Essential Commands

```bash
# System Status
node auto-behavior-system.js status

# Test Skills
node auto-behavior-system.js test-skill

# List Skills
node skill-executor.js list

# Memory Info
node enhanced-memory-manager.js info

# View Logs
tail -f ~/.claude/memory/skill-execution.log
tail -f ~/.claude/memory/auto-behavior.log

# Debug Mode
export AGENT_DEBUG=true
```

### Skills vs Agents Decision

| Task Type | Use | Tokens | Speed |
|-----------|-----|--------|-------|
| Code formatting | Skill | 350 | <1s |
| Tech debt scan | Skill | 350 | <1s |
| PR review | Skill | 350 | <1s |
| Security scan | Skill | 350 | <1s |
| API docs gen | Skill | 350 | <1s |
| Architecture design | Agent | 20,000 | 20-30s |
| Bug investigation | Agent | 20,000 | 20-30s |
| Strategic planning | Agent | 20,000 | 20-30s |

### Configuration Files

```
~/.claude/memory/
├── global-memory.json              # Global patterns
├── auto-behavior-config.json       # System config
└── repositories/
    └── {hash}/
        ├── memory.json             # Repo patterns
        └── overrides.json          # Overrides
```

---

## Getting Help

### Documentation

- 📚 [Full Documentation](./MEMORY_SYSTEM_DOCUMENTATION.md)
- 🏗️ [Architecture Guide](./ARCHITECTURE.md)
- 🎯 [Skills Reference](./SKILLS_GUIDE.md)
- 📋 [Changelog](./CHANGELOG.md)

### Support Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and community support
- **README**: Quick reference and overview

### Useful Links

- **Repository**: https://github.com/benreceveur/claude-memory-system
- **Latest Release**: Check [Releases](https://github.com/benreceveur/claude-memory-system/releases)
- **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Success Checklist

Before you finish, make sure you can:

- ✅ Run `node auto-behavior-system.js status` successfully
- ✅ See Skills listed with `node skill-executor.js list`
- ✅ Test Skills detection with `node auto-behavior-system.js test-skill`
- ✅ View memory info with `node enhanced-memory-manager.js info`
- ✅ Understand the difference between Skills and Agents
- ✅ Know where to find logs and configuration files

**Congratulations!** 🎉 You're ready to use the Claude Memory System with Skills orchestration.

---

**Need more help?** Check the [troubleshooting section](#troubleshooting) or [open an issue](https://github.com/benreceveur/claude-memory-system/issues) on GitHub.
