# Skills Reference Guide

**Complete reference for all 18 Skills in Claude Memory System v3.0**

This guide provides detailed information about each Skill, including use cases, examples, and best practices.

---

## Table of Contents

- [Code Quality & Analysis](#code-quality--analysis)
- [Development Workflow](#development-workflow)
- [Infrastructure & DevOps](#infrastructure--devops)
- [Documentation & APIs](#documentation--apis)
- [Data & Database](#data--database)
- [Incident Management](#incident-management)

---

## Code Quality & Analysis

### tech-debt-tracker

**Purpose**: Identify, measure, and prioritize technical debt

**Confidence Keywords**: `technical debt`, `tech debt`, `code quality`, `code complexity`, `code duplication`, `refactoring priorities`, `maintainability`

**Use Cases**:
- Pre-release code quality audits
- Sprint planning prioritization
- Refactoring roadmap creation
- Code review quality gates

**Example Usage**:
```
User: "Track technical debt in my codebase"
System: ✅ tech-debt-tracker Skill (58% confidence)
Result: Comprehensive debt analysis in <1s
```

**Output Includes**:
- SQALE index and maintainability score
- Code complexity metrics (cyclomatic, cognitive)
- Duplication analysis
- Refactoring priorities
- Estimated remediation time

---

### code-formatter

**Purpose**: Multi-language code formatting and linting with auto-fix

**Confidence Keywords**: `format code`, `prettier`, `eslint`, `black formatter`, `code style`, `lint code`, `fix formatting`

**Supported Languages**:
- JavaScript/TypeScript (Prettier + ESLint)
- Python (Black + isort)
- Go (gofmt)
- Rust (rustfmt)

**Use Cases**:
- Pre-commit formatting
- Batch legacy code cleanup
- Enforce team style standards
- CI/CD integration

**Example Usage**:
```
User: "Format my TypeScript files with prettier"
System: ✅ code-formatter Skill (58% confidence)
Result: All files formatted in <1s
```

---

### semantic-search

**Purpose**: Natural language code search and pattern detection

**Confidence Keywords**: `semantic search`, `natural language code search`, `pattern detection`, `code search`, `find code`

**Use Cases**:
- Find code by description
- Locate similar patterns
- Identify usage examples
- Cross-reference implementations

**Example Usage**:
```
User: "Find all API endpoints that handle authentication"
System: ✅ semantic-search Skill
Result: Relevant files and functions
```

---

### codebase-navigator

**Purpose**: Fast repository comprehension through structured exploration

**Confidence Keywords**: `explore codebase`, `navigate repository`, `understand architecture`, `repository structure`

**Use Cases**:
- Onboarding new developers
- Pre-refactoring exploration
- Architectural analysis
- Documentation generation

**Example Usage**:
```
User: "Help me understand this codebase structure"
System: ✅ codebase-navigator Skill
Result: Organized architecture overview
```

---

## Development Workflow

### test-first-change

**Purpose**: TDD workflow with test discovery and execution

**Confidence Keywords**: `test first`, `discover tests`, `run tests before change`, `tdd workflow`, `regression prevention`

**Workflow**:
1. Discover related tests
2. Run tests (baseline)
3. Make code changes
4. Re-run tests (validation)

**Use Cases**:
- Prevent regressions
- TDD enforcement
- Safe refactoring
- CI/CD integration

**Example Usage**:
```
User: "I want to refactor the auth module safely"
System: ✅ test-first-change Skill
Result: Runs 23 related tests, ready for changes
```

---

### pr-author-reviewer

**Purpose**: Pull request quality assurance and security review

**Confidence Keywords**: `review pull request`, `pr checklist`, `code review`, `pr template`, `security review`

**Review Areas**:
- Code quality and standards
- Security vulnerabilities
- Test coverage
- Documentation completeness
- Breaking changes

**Use Cases**:
- Pre-submission PR validation
- Automated review comments
- Security gate enforcement
- Quality metrics tracking

**Example Usage**:
```
User: "Review my PR for security issues"
System: ✅ pr-author-reviewer Skill (63% confidence)
Result: Security checklist with findings
```

---

### release-orchestrator

**Purpose**: Automated release management and versioning

**Confidence Keywords**: `release automation`, `semantic versioning`, `changelog generation`, `deployment automation`

**Capabilities**:
- Semantic version bumping
- Changelog generation
- Tag creation
- Multi-environment deployment
- Rollback procedures

**Use Cases**:
- Automated releases
- Version management
- Release notes generation
- Deployment pipelines

---

### ai-code-generator

**Purpose**: AI-powered code and test generation

**Confidence Keywords**: `generate code`, `generate boilerplate`, `scaffold`, `crud api`, `generate tests`

**Generation Types**:
- Boilerplate code
- CRUD APIs
- Test suites
- Data fixtures
- Client SDKs

**Use Cases**:
- Quick prototyping
- Repetitive code generation
- Test coverage improvement
- API client generation

---

## Infrastructure & DevOps

### container-validator

**Purpose**: Docker/Kubernetes best practices validation

**Confidence Keywords**: `validate dockerfile`, `kubernetes manifest`, `docker best practices`, `container security`

**Validation Areas**:
- Dockerfile best practices
- Security vulnerabilities
- Image optimization
- K8s manifest validation
- Helm chart linting

**Use Cases**:
- Pre-build validation
- Security compliance
- Cost optimization
- CI/CD gates

---

### security-scanner

**Purpose**: Comprehensive security scanning (SAST, secrets, OWASP)

**Confidence Keywords**: `security scan`, `sast`, `secrets detection`, `owasp vulnerabilities`, `vulnerability scan`

**Scan Types**:
- Static application security testing (SAST)
- Secret detection
- Dependency vulnerabilities
- OWASP Top 10
- Container security
- IaC security

**Use Cases**:
- Pre-commit security checks
- CI/CD security gates
- Compliance audits
- Vulnerability management

---

### performance-profiler

**Purpose**: Performance analysis and optimization

**Confidence Keywords**: `profile performance`, `cpu profiling`, `memory profiling`, `performance bottleneck`, `query optimization`

**Analysis Types**:
- CPU profiling
- Memory profiling
- Database query optimization
- Network latency
- Rendering performance

**Use Cases**:
- Performance debugging
- Optimization planning
- Resource usage analysis
- Capacity planning

---

### finops-optimizer

**Purpose**: Cloud cost optimization (AWS/Azure/GCP)

**Confidence Keywords**: `cloud cost`, `cost optimization`, `finops`, `aws costs`, `azure costs`, `gcp costs`, `rightsizing`

**Optimization Areas**:
- Resource rightsizing
- Reserved instance recommendations
- Unused resource identification
- Storage optimization
- Network cost reduction

**Use Cases**:
- Monthly cost reviews
- Budget planning
- Resource optimization
- Cost allocation

---

## Documentation & APIs

### api-documentor

**Purpose**: OpenAPI/Swagger/GraphQL documentation generation

**Confidence Keywords**: `generate api docs`, `openapi spec`, `swagger documentation`, `graphql schema`

**Generates**:
- OpenAPI 3.0 specifications
- Swagger UI
- GraphQL schema docs
- Client SDKs (Python, JS, Go, Java)
- API reference pages

**Use Cases**:
- API documentation
- Client SDK generation
- API versioning
- Developer portals

---

### documentation-sync

**Purpose**: Documentation drift detection and correction

**Confidence Keywords**: `sync documentation`, `code documentation drift`, `validate examples`, `generate diagrams`

**Capabilities**:
- Code-doc drift detection
- Example validation
- Diagram generation
- Auto-update docs
- Link validation

**Use Cases**:
- Documentation maintenance
- Example verification
- Diagram updates
- Link checking

---

## Data & Database

### database-migrator

**Purpose**: Schema migration management and versioning

**Confidence Keywords**: `database migration`, `schema migration`, `migration script`, `schema version`, `rollback migration`

**Supports**:
- Flyway
- Liquibase
- Alembic (Python)
- TypeORM (TypeScript)
- Laravel Migrations

**Use Cases**:
- Schema versioning
- Migration generation
- Rollback procedures
- Cross-environment sync

---

### dependency-guardian

**Purpose**: Dependency security and update management

**Confidence Keywords**: `update dependencies`, `security scan`, `vulnerability scan`, `outdated packages`, `npm audit`

**Functions**:
- Vulnerability scanning
- Update recommendations
- Compatibility validation
- License compliance
- Breaking change detection

**Use Cases**:
- Security patching
- Dependency updates
- License auditing
- Compatibility checking

---

## Incident Management

### incident-triage

**Purpose**: On-call handoffs and postmortem facilitation

**Confidence Keywords**: `incident triage`, `on-call`, `postmortem`, `incident response`, `triage sop`

**Workflow**:
1. Incident detection
2. Triage checklist
3. Response playbook
4. Communication templates
5. Postmortem generation

**Use Cases**:
- On-call handoffs
- Incident response
- Postmortem creation
- Runbook execution

---

### memory-hygiene

**Purpose**: Memory system maintenance and validation

**Confidence Keywords**: `clean memory`, `validate schema`, `compact memory`, `deduplicate`, `memory cleanup`

**Maintenance Tasks**:
- Deduplication
- Schema validation
- Stale data expiration
- Compaction
- Integrity checks

**Use Cases**:
- Regular maintenance
- Performance optimization
- Data quality
- Storage cleanup

---

## Skills Usage Patterns

### Pattern 1: Pre-Commit Workflow

```bash
# 1. Format code
"Format my code with prettier"
→ code-formatter Skill

# 2. Run tests
"Run tests before committing"
→ test-first-change Skill

# 3. Security scan
"Scan for security issues"
→ security-scanner Skill

# 4. Commit with confidence!
```

### Pattern 2: PR Preparation

```bash
# 1. Check technical debt
"Track any technical debt I'm introducing"
→ tech-debt-tracker Skill

# 2. Generate docs
"Update API documentation"
→ api-documentor Skill

# 3. Review PR
"Review my PR for quality and security"
→ pr-author-reviewer Skill
```

### Pattern 3: Production Deployment

```bash
# 1. Validate containers
"Check my Dockerfile for best practices"
→ container-validator Skill

# 2. Security scan
"Run final security scan"
→ security-scanner Skill

# 3. Create release
"Generate release notes and tag"
→ release-orchestrator Skill
```

---

## Skills vs Agents Decision Guide

### Use Skills When:
- ✅ Task is procedural with clear steps
- ✅ Deterministic output expected
- ✅ Speed is important (<1s)
- ✅ Token efficiency matters
- ✅ Repeatability needed

### Use Agents When:
- ✅ Task requires analysis and judgment
- ✅ Multiple approaches possible
- ✅ Strategic thinking needed
- ✅ Context-aware decisions required
- ✅ Recommendations wanted

### Example Decision Tree:

```
Question: "Should I use a Skill or Agent for X?"

Is X a well-defined procedural task?
├─ Yes → Use Skill
└─ No → Is X about strategy or design?
    ├─ Yes → Use Agent
    └─ No → Can X be broken into steps?
        ├─ Yes → Use Skill
        └─ No → Use Agent
```

---

## Advanced Usage

### Chaining Skills

Skills can be chained for complex workflows:

```
1. code-formatter → Format all code
2. test-first-change → Run test suite
3. security-scanner → Security validation
4. pr-author-reviewer → Final PR check
```

### Custom Skill Patterns

Add your own patterns in `auto-behavior-system.js`:

```javascript
'your-skill-name': {
    keywords: [
        'primary keyword',
        'alternate phrase',
        'multi word pattern'
    ],
    confidence: 0.9,
    description: 'What your Skill does'
}
```

### Skill Confidence Tuning

Adjust thresholds for your workflow:

```javascript
// Lower threshold = more Skills activated
skillConfidenceThreshold: 0.4  // 40% minimum

// Higher threshold = fewer Skills, more Agents
skillConfidenceThreshold: 0.7  // 70% minimum
```

---

## Troubleshooting

### Skill Not Activating

```bash
# Check if Skill exists
node skill-executor.js list | grep skill-name

# Test pattern matching
node auto-behavior-system.js prompt "your test input"

# Check confidence threshold
node auto-behavior-system.js status | jq '.config.skillConfidenceThreshold'
```

### Skill Execution Failed

```bash
# Check execution log
tail -f ~/.claude/memory/skill-execution.log

# Verify Skill script
ls -la ~/.claude/skills/skill-name/scripts/

# Test Skill directly
node skill-executor.js execute skill-name
```

---

## Best Practices

### 1. Use Skills for Repetitive Tasks
Skills excel at tasks you do frequently:
- Code formatting
- Test execution
- Security scanning
- Documentation generation

### 2. Combine Skills and Agents
Let Skills handle procedural steps, Agents handle strategy:
- Agent designs architecture
- Skills validate and implement
- Agent reviews and recommends improvements

### 3. Monitor Performance
Track which Skills save you the most time:
```bash
grep executionTimeMs skill-execution.log | sort -t: -k2 -n
```

### 4. Keep Patterns Updated
As your workflow evolves, update Skills patterns:
- Add new keywords
- Adjust confidence values
- Remove obsolete patterns

---

## Contributing New Skills

Want to add a new Skill? Here's how:

### 1. Create Skill Directory

```bash
mkdir -p ~/.claude/skills/your-skill-name/scripts
```

### 2. Add SKILL.md

```markdown
---
name: your-skill-name
description: What your Skill does
version: 1.0.0
tags: [category, tags]
---

# Your Skill Name

## Purpose
Clear description...
```

### 3. Create Main Script

```python
#!/usr/bin/env python3
import sys
import json
import os

# Read context
context = json.loads(os.environ.get('SKILL_CONTEXT', '{}'))

# Do your work
result = {
    "success": True,
    "output": "Skill result here"
}

# Return JSON
print(json.dumps(result))
```

### 4. Add Pattern

In `auto-behavior-system.js`:

```javascript
'your-skill-name': {
    keywords: [
        'skill trigger',
        'another trigger',
        ...
    ],
    confidence: 0.9,
    description: 'What it does'
}
```

---

## Quick Reference

### All Skills by Category

**Code Quality**: tech-debt-tracker, code-formatter, semantic-search, codebase-navigator

**Workflow**: test-first-change, pr-author-reviewer, release-orchestrator, ai-code-generator

**DevOps**: container-validator, security-scanner, performance-profiler, finops-optimizer

**Documentation**: api-documentor, documentation-sync

**Data**: database-migrator, dependency-guardian

**Operations**: incident-triage, memory-hygiene

### Token Savings

| Skill | Tokens | vs Agent | Savings |
|-------|--------|----------|---------|
| Any Skill | ~350 | ~20,000 | **98%** |

### Speed Comparison

| Operation | Skill Time | Agent Time | Speedup |
|-----------|-----------|------------|---------|
| Any Skill | <1 second | 20-30s | **20-30x** |

---

## Further Reading

- **[README](./README.md)** - System overview
- **[Getting Started](./GETTING_STARTED.md)** - Installation guide
- **[Architecture](./ARCHITECTURE.md)** - Technical details
- **[Changelog](./CHANGELOG.md)** - Version history

---

**Last Updated**: October 22, 2025
**Version**: 3.0
**Total Skills**: 18
