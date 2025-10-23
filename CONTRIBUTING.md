# Contributing to Claude Memory System

Thank you for your interest in contributing to the Claude Memory System! This document provides guidelines and instructions for contributing.

## 🎯 Ways to Contribute

### 1. Report Bugs
- Use the [GitHub Issues](https://github.com/benreceveur/claude-memory-system/issues) page
- Check if the issue already exists before creating a new one
- Include detailed steps to reproduce
- Provide your environment details (OS, Node version, shell)

### 2. Suggest Features
- Open a [GitHub Issue](https://github.com/benreceveur/claude-memory-system/issues) with the "enhancement" label
- Describe the feature and its use case
- Explain how it improves the system
- Consider implementation complexity

### 3. Add Skills
- Create new Skills for common development tasks
- Follow the [Skill Structure](#skill-structure) below
- Add comprehensive documentation
- Include examples and best practices

### 4. Improve Documentation
- Fix typos and clarify unclear sections
- Add examples and use cases
- Update outdated information
- Translate documentation

### 5. Submit Code
- Fix bugs
- Implement new features
- Optimize performance
- Improve test coverage

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ installed
- **Git** installed
- **Claude Code CLI** (optional, for testing)
- Familiarity with JavaScript/Bash

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/claude-memory-system.git
cd claude-memory-system

# Add upstream remote
git remote add upstream https://github.com/benreceveur/claude-memory-system.git

# Install the system for testing
./install.sh
```

---

## 📝 Development Workflow

### 1. Create a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed

### 3. Test Your Changes

```bash
# Test core system
cd ~/.claude/memory
node auto-behavior-system.js status
node auto-behavior-system.js test-skill

# Test skill executor
node skill-executor.js list
node skill-executor.js execute memory-hygiene

# Test installation
./install.sh
```

### 4. Commit Changes

```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add new skill for XYZ"
# or
git commit -m "fix: resolve issue with ABC"
# or
git commit -m "docs: update installation guide"
```

**Commit Message Format**:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 5. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Provide clear description of changes
# Reference any related issues
```

---

## 🎯 Skill Structure

When creating a new Skill, follow this structure:

```
~/.claude/skills/category/skill-name/
├── SKILL.md              # Required: Skill documentation
├── scripts/              # Optional: Executable scripts
│   └── main.py          # Main execution script
└── README.md            # Optional: Additional documentation
```

### SKILL.md Template

```markdown
# Skill Name

## Description
Clear, concise description of what this Skill does.

## When to Use
- Specific use case 1
- Specific use case 2
- Specific use case 3

## Key Capabilities
1. **Feature 1**: Description
2. **Feature 2**: Description
3. **Feature 3**: Description

## Best Practices
- Best practice 1
- Best practice 2
- Best practice 3

## Common Patterns
\`\`\`language
// Code example
\`\`\`

## Tools Integration
- Tool 1: Usage
- Tool 2: Usage

## Quality Checklist
- ✅ Criterion 1
- ✅ Criterion 2
- ✅ Criterion 3
```

### Adding Skill Pattern

To make your Skill discoverable by the orchestration system, add a pattern in `auto-behavior-system.js`:

```javascript
'your-skill-name': {
    keywords: [
        'keyword one',
        'multi word keyword',
        'another pattern'
    ],
    confidence: 0.9,  // Base confidence (0.0 to 1.0)
    description: 'Brief description for logging'
}
```

---

## 🤖 Adding Agents

Agents are markdown files that provide specialized prompts for complex tasks.

### Agent Structure

```
~/.claude/agents/agent-name.md
```

### Agent Template

```markdown
# Agent Name

## Role
Specialized role and expertise area

## Capabilities
- Capability 1
- Capability 2
- Capability 3

## Approach
1. Step 1
2. Step 2
3. Step 3

## Best Practices
- Practice 1
- Practice 2
- Practice 3

## Common Tasks
### Task 1
Description and approach

### Task 2
Description and approach
```

---

## 📚 Documentation Guidelines

### Documentation Standards

1. **Clear and Concise**: Use simple language
2. **Examples**: Include code examples
3. **Structure**: Use consistent heading levels
4. **Links**: Keep internal links updated
5. **Format**: Follow Markdown best practices

### Files to Update

When adding features, update:
- `README.md` - If it affects installation or main features
- `CHANGELOG.md` - Always document changes
- `INSTALL.md` - If it affects installation
- `GETTING_STARTED.md` - If it affects getting started
- `SKILLS_GUIDE.md` - If adding new Skills

---

## ✅ Pull Request Checklist

Before submitting a Pull Request, ensure:

- [ ] Code follows existing style and conventions
- [ ] All tests pass
- [ ] New features include tests
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] Commit messages are descriptive
- [ ] No merge conflicts with main branch
- [ ] PR description clearly explains changes

---

## 🧪 Testing

### Manual Testing

```bash
# Test core system
cd ~/.claude/memory
node auto-behavior-system.js status
node auto-behavior-system.js test-skill

# Test specific skill
node skill-executor.js info skill-name
node skill-executor.js execute skill-name

# Test agent dispatcher
node enhanced-agent-dispatcher.js analyze "test input"

# Test installation
./install.sh
```

### Validation Scripts

```bash
# Validate JSON files
jq . ~/.claude/memory/global-memory.json
jq . ~/.claude/memory/auto-behavior-config.json

# Check Skills count
find ~/.claude/skills -name "SKILL.md" | wc -l

# Check Agents count
ls ~/.claude/agents/*.md | wc -l
```

---

## 🐛 Bug Reports

When reporting bugs, include:

1. **Environment**
   - OS and version
   - Node.js version
   - Shell (bash/zsh)
   - Claude Code version

2. **Steps to Reproduce**
   - Exact commands run
   - Expected behavior
   - Actual behavior

3. **Logs**
   - Relevant log output
   - Error messages
   - Stack traces

4. **Screenshots** (if applicable)

---

## 💡 Feature Requests

When suggesting features:

1. **Use Case**: Describe the problem you're trying to solve
2. **Proposed Solution**: How you envision it working
3. **Alternatives**: Other solutions you've considered
4. **Impact**: Who benefits and how

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Our Standards

- **Be Respectful**: Treat everyone with respect
- **Be Collaborative**: Work together constructively
- **Be Professional**: Focus on the issue, not the person
- **Be Inclusive**: Welcome diverse perspectives

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Spam or off-topic content

---

## ❓ Questions?

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check the [README.md](README.md) and [GETTING_STARTED.md](GETTING_STARTED.md)

---

## 🙏 Recognition

Contributors will be recognized in:
- Git commit history
- CHANGELOG.md (for significant contributions)
- GitHub contributors page

Thank you for contributing to the Claude Memory System! 🎉

---

**Repository**: https://github.com/benreceveur/claude-memory-system
**License**: MIT
**Maintainer**: Ben Receveur
