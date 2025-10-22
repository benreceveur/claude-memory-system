# Architecture Documentation

**Claude Memory System v3.0 - Technical Architecture**

This document provides a comprehensive overview of the Claude Memory System's architecture, including component design, data flows, and technical implementation details.

---

## Table of Contents

- [System Overview](#system-overview)
- [Component Architecture](#component-architecture)
- [Skills Orchestration](#skills-orchestration)
- [Memory System](#memory-system)
- [Agent Dispatch](#agent-dispatch)
- [Data Flow](#data-flow)
- [Security](#security)
- [Performance](#performance)
- [Scalability](#scalability)

---

## System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Claude Code CLI                               │
│                     (User Interface)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                 Memory Loader (Startup)                          │
│  • Repository Detection                                          │
│  • Memory Context Loading                                        │
│  • Auto Behavior Activation                                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              Auto Behavior System (v3.0)                         │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐│
│  │ Skills Pattern   │→ │ Agent Dispatcher │→ │ Behavior       ││
│  │ Matching Engine  │  │ (Role Mapping)   │  │ Enforcer       ││
│  └──────────────────┘  └──────────────────┘  └────────────────┘│
└────────────────────────┬────────────────────────────────────────┘
                         │
           ┌─────────────┴─────────────┐
           ↓                           ↓
┌──────────────────────┐    ┌──────────────────────┐
│  Skill Executor      │    │  Agent Runtime       │
│  • 18 Skills         │    │  • Specialized Agents│
│  • 350 tokens        │    │  • 20,000 tokens     │
│  • <1s execution     │    │  • 20-30s execution  │
│  • Caching enabled   │    │  • Skills access     │
└──────────────────────┘    └──────────────────────┘
           │                           │
           └─────────────┬─────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                 Enhanced Memory Manager                          │
│  • Global Patterns                                               │
│  • Repository-Specific Patterns                                  │
│  • Session Continuity                                            │
│  • Learning System                                               │
└─────────────────────────────────────────────────────────────────┘
```

### Design Principles

1. **Efficiency First**: Prefer Skills (350 tokens) over Agents (20,000 tokens)
2. **Smart Routing**: Automatic task classification and routing
3. **Context Awareness**: Repository-specific memory and patterns
4. **Fail-Safe**: Graceful degradation when Skills unavailable
5. **Learning**: Continuous improvement from usage patterns
6. **Security**: Validation and sandboxing at every layer

---

## Component Architecture

### 1. Auto Behavior System

**File**: `auto-behavior-system.js`
**Responsibility**: Central orchestration and routing

```javascript
class AutoBehaviorSystemWithSkills {
  constructor()
    ├── loadConfig()           // Load configuration
    ├── initializeIntegrations() // Setup Skills, Agents, Memory
    └── defineSkillPatterns()   // 18 Skill patterns

  async processPrompt(input, context)
    ├── Load memory context
    ├── Check Skills patterns (>50% confidence)
    │   └── If match → Execute Skill (DONE)
    ├── Dispatch to Agent (Skills available)
    ├── Apply behavior rules
    └── Log interaction
}
```

**Key Components**:

#### Pattern Matching Engine
```javascript
async checkForSkill(input, context) {
  // Flexible keyword matching
  for (keyword in pattern.keywords) {
    const words = keyword.split(' ');
    if (allWordsPresent(words, input)) {
      score += 1;
    }
  }

  // Confidence calculation
  const matchRatio = score / totalKeywords;
  const confidence = baseConfidence * (0.6 + matchRatio * 0.4);

  // Skill availability check
  if (skillExists(skill) && confidence > 0.5) {
    return { skill, confidence, available: true };
  }
}
```

#### Confidence Formula
```
confidence = base * (0.6 + matchRatio * 0.4)

Where:
- base = 0.9 (pattern base confidence)
- matchRatio = matched_keywords / total_keywords
- 0.6 = 60% base confidence with any match
- 0.4 = 40% additional scaling based on match ratio

Examples:
- 1/10 keywords matched = 0.9 * (0.6 + 0.1 * 0.4) = 0.576 (57.6%)
- 2/10 keywords matched = 0.9 * (0.6 + 0.2 * 0.4) = 0.612 (61.2%)
- 5/10 keywords matched = 0.9 * (0.6 + 0.5 * 0.4) = 0.72 (72%)
```

### 2. Skill Executor

**File**: `skill-executor.js`
**Responsibility**: Secure Skill execution

```javascript
class SkillExecutor {
  async execute(skillName, context, options) {
    // Security validations
    1. Sanitize skill name
    2. Validate context (no prototype pollution)
    3. Check concurrent execution limit (max 5)
    4. Validate script path (no traversal)

    // Execution
    5. Load Skill metadata
    6. Check cache (if enabled)
    7. Execute script with timeout
    8. Cache result (TTL: 5 minutes)
    9. Log execution

    return { success, result, executionTimeMs };
  }
}
```

**Security Features**:
- **Path Validation**: Scripts must be within Skills directory
- **Extension Whitelist**: Only `.py`, `.js`, `.sh` allowed
- **Concurrent Limits**: Maximum 5 parallel executions
- **Timeout Protection**: 60-second max execution time
- **Input Sanitization**: Context sanitized before execution

### 3. Enhanced Agent Dispatcher

**File**: `enhanced-agent-dispatcher.js`
**Responsibility**: Agent selection and routing

```javascript
class EnhancedAgentDispatcher {
  async dispatch(input, context) {
    // Analyze input
    1. Calculate agent scores (roleMapping)
    2. Apply repository boosts (if available)
    3. Check mandatory triggers
    4. Load available Skills

    // Select agent
    5. Choose highest confidence agent (>70%)
    6. Include Skills availability info

    return {
      recommended_agent,
      confidence,
      available_skills: [...]  // NEW in v3.0
    };
  }
}
```

**Role Mapping Structure**:
```javascript
'agent-name': {
  confidence_boosters: [...],    // Keywords that increase confidence
  mandatory_triggers: [...],     // Patterns that require this agent
  context_indicators: [...]      // File/directory patterns
}
```

### 4. Enhanced Memory Manager

**File**: `enhanced-memory-manager.js`
**Responsibility**: Memory storage and retrieval

```javascript
class EnhancedMemoryManager {
  getEffectiveMemory() {
    // Load global patterns
    const global = loadGlobalMemory();

    // Detect repository
    const repo = detectRepository();

    if (repo) {
      // Load repository-specific patterns
      const repoMemory = loadRepositoryMemory(repo.hash);

      // Apply overrides
      const overrides = loadOverrides(repo.hash);

      // Merge: global + repo + overrides
      return merge(global, repoMemory, overrides);
    }

    return global;
  }
}
```

**Memory Hierarchy**:
```
Priority: Overrides > Repository > Global

Example:
Global:        { testing: "jest" }
Repository:    { testing: "mocha" }
Override:      { testing: "vitest" }
Effective:     { testing: "vitest" }
```

---

## Skills Orchestration

### Pattern Matching Flow

```
User Input: "Track technical debt in my codebase"
    ↓
1. Normalize Input
   "track technical debt in my codebase"
    ↓
2. Check All Patterns (18 Skills)
   tech-debt-tracker:
     - Keywords: ["technical debt", "tech debt", "code quality", ...]
     - Match: "technical debt" ✓
     - Score: 1/10
    ↓
3. Calculate Confidence
   base = 0.9
   matchRatio = 1/10 = 0.1
   confidence = 0.9 * (0.6 + 0.1 * 0.4) = 0.576 (57.6%)
    ↓
4. Check Threshold
   57.6% > 50% ✓
    ↓
5. Verify Skill Exists
   /Users/.../.claude/skills/tech-debt-tracker ✓
    ↓
6. Execute Skill
   Result: Success in 800ms using 350 tokens
```

### Execution Decision Tree

```
                    Input Received
                         |
                         ↓
              ┌──────────────────────┐
              │ Skills Pattern Match │
              └──────────┬───────────┘
                         |
           ┌─────────────┴─────────────┐
           |                           |
      Confidence > 50%           Confidence < 50%
           |                           |
           ↓                           ↓
    ┌──────────────┐          ┌──────────────────┐
    │ Skill Exists?│          │ Agent Dispatcher │
    └──────┬───────┘          └────────┬─────────┘
           |                           |
       Yes | No                        ↓
           |                    ┌──────────────┐
           ↓                    │ Agent Match? │
    ┌──────────────┐            └──────┬───────┘
    │ Execute Skill│                   |
    │ 350 tokens   │            Yes | No (default)
    │ <1 second    │                 |
    └──────────────┘                 ↓
                              ┌──────────────────┐
                              │ Execute Agent    │
                              │ 20,000 tokens    │
                              │ 20-30 seconds    │
                              │ (Skills available)│
                              └──────────────────┘
```

### Pattern Definition

**Structure**:
```javascript
{
  'skill-name': {
    keywords: [
      'primary keyword',
      'alternate phrase',
      'multi word pattern'
    ],
    confidence: 0.9,  // Base confidence multiplier
    description: 'What this Skill does'
  }
}
```

**Best Practices**:
- 7-12 keywords per Skill
- Mix of specific and general terms
- Include common variations
- Use lowercase for matching
- Multi-word phrases supported

---

## Memory System

### Storage Structure

```
~/.claude/memory/
├── global-memory.json              # Global patterns
├── repositories/
│   ├── index.json                  # Repository registry
│   ├── {hash-1}/
│   │   ├── metadata.json           # Repository info
│   │   ├── memory.json             # Repository patterns
│   │   └── overrides.json          # Global overrides
│   └── {hash-2}/
│       └── ...
└── ...
```

### Global Memory Schema

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
      "linting": "eslint"
    },
    "enforcement_rules": {
      "rules": [
        "Always use absolute paths",
        "Read before write",
        ...
      ]
    }
  },
  "agents": {
    "frontend-developer": {
      "patterns": ["component", "react", "ui"]
    }
  }
}
```

### Repository Memory Schema

```json
{
  "repository": {
    "name": "my-project",
    "hash": "abc123...",
    "remote": "github.com/user/project"
  },
  "patterns": {
    "custom_patterns": {
      "api_style": "rest",
      "db_orm": "prisma"
    }
  },
  "agents": {
    "preferred_backend": "python-pro"
  }
}
```

### Memory Operations

**Load Memory**:
```javascript
// 1. Detect repository
const repo = detectRepository();

// 2. Load global
const global = loadGlobalMemory();

// 3. Load repository (if exists)
const repoMemory = repo ? loadRepoMemory(repo.hash) : {};

// 4. Load overrides
const overrides = repo ? loadOverrides(repo.hash) : {};

// 5. Merge (overrides > repo > global)
const effective = {
  ...global,
  ...repoMemory,
  ...overrides
};
```

**Update Memory**:
```javascript
// Repository-specific update
updateMemory(repoHash, {
  patterns: {
    new_pattern: "value"
  }
});

// Global update
updateGlobalMemory({
  agents: {
    new_agent: { patterns: [...] }
  }
});
```

---

## Agent Dispatch

### Role Mapping

**Structure**:
```javascript
{
  'agent-name': {
    confidence_boosters: [
      'keyword1', 'keyword2', ...
    ],
    mandatory_triggers: [
      'regex_pattern1',
      'regex_pattern2'
    ],
    context_indicators: [
      'file_extension',
      'directory_name',
      ...
    ]
  }
}
```

### Confidence Calculation

```javascript
function calculateAgentScore(input, agent, context) {
  let score = 0;

  // 1. Keyword matching (60% weight)
  const keywordMatches = countMatches(
    input,
    agent.confidence_boosters
  );
  score += (keywordMatches / totalKeywords) * 0.6;

  // 2. Context indicators (30% weight)
  if (context.filePaths) {
    const contextMatches = countMatches(
      context.filePaths,
      agent.context_indicators
    );
    score += (contextMatches / totalIndicators) * 0.3;
  }

  // 3. Repository boost (10% weight)
  if (isPreferredForRepo(agent)) {
    score += 0.1;
  }

  return Math.min(score, 1.0);
}
```

### Mandatory Triggers

Certain patterns **always** trigger specific agents:

```javascript
mandatory_triggers: [
  'create.*component',     // → frontend-developer
  'fix.*vulnerability',    // → security-engineer
  'deploy.*application'    // → devops-engineer
]
```

---

## Data Flow

### Request Processing Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User Input                                               │
│    "Track technical debt in my codebase"                    │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Memory Context Loading                                   │
│    • Load global patterns                                   │
│    • Detect repository                                      │
│    • Load repository-specific patterns                      │
│    • Merge with overrides                                   │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Skills Pattern Matching                                  │
│    • Normalize input                                        │
│    • Check all 18 Skill patterns                            │
│    • Calculate confidence scores                            │
│    • Select best match                                      │
└────────────────────────┬────────────────────────────────────┘
                         ↓
                 ┌───────┴────────┐
                 │ Confidence > 50%│
                 └───────┬─────────┘
                         |
            ┌────────────┴────────────┐
            |                         |
           Yes                        No
            ↓                         ↓
┌──────────────────────┐    ┌──────────────────────┐
│ 4a. Skill Execution  │    │ 4b. Agent Dispatch   │
│  • Validate Skill    │    │  • Calculate scores  │
│  • Check cache       │    │  • Select agent      │
│  • Execute script    │    │  • Include Skills    │
│  • Cache result      │    │  • Execute task      │
│  • Return result     │    │  • Return result     │
└──────────┬───────────┘    └───────────┬──────────┘
           |                            |
           └─────────────┬──────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Post-Processing                                          │
│    • Log execution                                          │
│    • Update learning system                                 │
│    • Update memory (if needed)                              │
│    • Cache results                                          │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. Return to User                                           │
│    • Format response                                        │
│    • Include metadata (tokens, time, confidence)            │
└─────────────────────────────────────────────────────────────┘
```

### Caching Flow

```
┌──────────────┐
│ Execute Skill│
└──────┬───────┘
       ↓
┌──────────────────┐
│ Generate Cache   │
│ Key: hash(skill  │
│  + context)      │
└──────┬───────────┘
       ↓
┌──────────────────┐
│ Check Existing   │
│ Cache            │
└──────┬───────────┘
       |
   ┌───┴────┐
   |  Found │
   └───┬────┘
       |
   Yes | No
       |
       ↓
┌──────────────────┐
│ Check TTL        │
│ (5 min default)  │
└──────┬───────────┘
       |
  ┌────┴────┐
  │ Valid?  │
  └────┬────┘
       |
   Yes | No
       |
       ↓          ↓
   Return      Execute
   Cached      and Cache
```

---

## Security

### Input Validation

**Skill Name Sanitization**:
```javascript
function sanitizeSkillName(name) {
  // Remove dangerous characters
  return name.replace(/[^a-zA-Z0-9_-]/g, '');
}
```

**Context Sanitization**:
```javascript
function sanitizeContext(context) {
  // Prevent prototype pollution
  const safe = {};
  for (const key in context) {
    if (context.hasOwnProperty(key) &&
        key !== '__proto__' &&
        key !== 'constructor' &&
        key !== 'prototype') {
      safe[key] = context[key];
    }
  }
  return safe;
}
```

### Path Traversal Protection

```javascript
function validateScriptPath(scriptPath) {
  // 1. Resolve to absolute path
  const resolved = path.resolve(scriptPath);
  const skillsDir = path.resolve(this.skillsDir);

  // 2. Must be within Skills directory
  if (!resolved.startsWith(skillsDir)) {
    throw new SecurityError('Path traversal detected');
  }

  // 3. No .. in path
  if (scriptPath.includes('..')) {
    throw new SecurityError('Path traversal detected');
  }

  // 4. Whitelisted extension
  const ext = path.extname(scriptPath);
  if (!this.allowedExtensions.includes(ext)) {
    throw new SecurityError('Invalid file extension');
  }

  return resolved;
}
```

### Execution Sandboxing

**Concurrent Execution Limits**:
```javascript
if (activeExecutions.size >= maxConcurrentExecutions) {
  throw new ConcurrencyError('Max concurrent executions reached');
}
```

**Timeout Protection**:
```javascript
execSync(command, {
  timeout: 60000,  // 60 second max
  maxBuffer: 10 * 1024 * 1024  // 10MB max output
});
```

---

## Performance

### Optimization Strategies

#### 1. Skills Over Agents
```
Decision: Use Skills when possible
Impact: 98% token reduction, 20-30x faster
```

#### 2. Result Caching
```javascript
// Cache with TTL
cacheResult(skillName, context, result, ttl = 300000);

// Cache key: hash(skillName + sorted(context))
// TTL: 5 minutes default
// Storage: ~/.claude/memory/.skill-cache/
```

#### 3. Lazy Loading
```javascript
// Only load what's needed
if (enableSkillsOrchestration) {
  this.skillExecutor = require('./skill-executor.js');
}
```

#### 4. Concurrent Skill Execution
```javascript
// Execute multiple Skills in parallel
const results = await Promise.all([
  executor.execute('skill1', context),
  executor.execute('skill2', context),
  executor.execute('skill3', context)
]);
```

### Performance Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Skills Detection | <100ms | ~50ms |
| Memory Load | <200ms | ~150ms |
| Skill Execution | <1s | ~800ms |
| Cache Hit Rate | >60% | ~70% |
| Agent Dispatch | <500ms | ~300ms |

---

## Scalability

### Horizontal Scaling

**Skills Executor**:
- Stateless design
- Concurrent execution support
- Independent caching per Skill
- No shared state between executions

**Memory System**:
- Repository isolation
- No cross-repository dependencies
- Parallel memory loading possible
- Distributed caching ready

### Vertical Scaling

**Memory Limits**:
```javascript
// Maximum values
maxConcurrentExecutions: 5     // Can increase based on CPU
maxExecutionTime: 60000         // Can adjust per Skill
maxBufferSize: 10 * 1024 * 1024 // Can increase for large outputs
```

**Cache Management**:
```javascript
// TTL-based expiration
defaultTTL: 300000  // 5 minutes
maxCacheSize: Unlimited (disk-based)
cleanupInterval: Automatic on expiration
```

### Future Enhancements

1. **Distributed Caching**: Redis/Memcached for shared cache
2. **Load Balancing**: Multiple Skill executor instances
3. **Persistent Memory**: Database-backed memory storage
4. **Real-time Sync**: WebSocket-based memory updates
5. **Cloud Integration**: AWS Lambda for Skill execution

---

## Monitoring & Observability

### Logging

**Skills Execution**:
```javascript
// skill-execution.log
{
  "timestamp": "2025-10-22T...",
  "skill": "tech-debt-tracker",
  "success": true,
  "executionTimeMs": 823,
  "cached": false,
  "error": null
}
```

**Auto Behavior**:
```javascript
// auto-behavior.log
{
  "timestamp": "2025-10-22T...",
  "execution_mode": "skill",
  "skill_recommended": "tech-debt-tracker",
  "skill_confidence": 0.576,
  "agent_recommended": null,
  "memory_context_loaded": true,
  "skills_available": 18
}
```

### Metrics

**Key Metrics to Track**:
- Skill execution rate vs Agent rate
- Average confidence scores
- Cache hit rates
- Execution times (p50, p95, p99)
- Token usage reduction
- Error rates

### Health Checks

```bash
# System health
node auto-behavior-system.js status

# Component health
node skill-executor.js list
node enhanced-agent-dispatcher.js test
node enhanced-memory-manager.js info
```

---

## Integration Points

### Claude Code Integration

**Startup Hook** (`memory-loader.sh`):
```bash
# Executed on Claude Code startup
1. Detect repository
2. Load memory context
3. Initialize Skills system
4. Activate auto behavior
```

**User Prompt Hook** (`auto-behavior-hook.sh`):
```bash
# Executed on every user input
1. Process input through auto behavior
2. Route to Skills or Agents
3. Apply enforcement rules
4. Return enhanced prompt
```

### External Systems

**Git Integration**:
- Repository detection via `.git` directory
- Remote URL hashing for unique IDs
- Branch-aware memory (future)

**Skills Integration**:
- Standard Skill interface (SKILL.md)
- Context passed via environment variables
- JSON result format
- Exit codes for status

**Agent Integration**:
- Standard Task tool interface
- Skills availability in dispatch
- Context sharing
- Result aggregation

---

## Deployment Considerations

### Installation

```bash
# Requirements
- Node.js 16+
- Git
- Bash/Zsh shell

# Files
~/.claude/memory/
├── auto-behavior-system.js      # Core orchestrator
├── enhanced-agent-dispatcher.js # Agent routing
├── skill-executor.js            # Skills execution
├── enhanced-memory-manager.js   # Memory management
├── memory-loader.sh             # Startup script
└── ...
```

### Configuration

**System Config**:
```javascript
// auto-behavior-system.js
{
  enableSkillsOrchestration: true,
  skillConfidenceThreshold: 0.5,
  confidenceThreshold: 0.7,
  enableAutoDispatch: true,
  enableMemoryIntegration: true
}
```

**User Config**:
```json
// ~/.claude/memory/global-memory.json
{
  "patterns": { ... },
  "agents": { ... }
}
```

### Upgrades

**Version Migration**:
1. Backup existing memory
2. Update core files
3. Run migration script (if needed)
4. Validate configuration
5. Test Skills detection

---

## Conclusion

The Claude Memory System v3.0 architecture provides:

✅ **Efficient**: 98% token reduction with Skills
✅ **Fast**: 20-30x faster execution
✅ **Intelligent**: Context-aware routing
✅ **Scalable**: Concurrent execution, caching
✅ **Secure**: Input validation, sandboxing
✅ **Maintainable**: Modular design, clear interfaces

The system is designed for reliability, performance, and extensibility, with clear separation of concerns and well-defined component boundaries.

---

**Last Updated**: October 22, 2025
**Version**: 3.0
**Status**: Production Ready ✅
