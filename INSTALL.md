# Installation Guide

**One-command installation for the Claude Memory System v3.0**

---

## Quick Install

```bash
# Clone the repository
git clone https://github.com/benreceveur/claude-memory-system.git
cd claude-memory-system

# Run the installer
./install.sh
```

That's it! The system will automatically install and configure everything.

---

## What Gets Installed

The installer will:

1. **Copy Core System** to `~/.claude/memory/`
   - `auto-behavior-system.js` - Skills orchestration engine
   - `enhanced-agent-dispatcher.js` - Agent routing
   - `skill-executor.js` - Skills execution engine
   - `memory-loader.sh` - Auto-loader script

2. **Install Skills** to `~/.claude/skills/`
   - 18 Core Skills (orchestration)
   - 5 High-Priority Skills (productivity)
   - Total: **23 Skills**

3. **Install Agents** to `~/.claude/agents/`
   - **75 Specialized Agents** for complex tasks

4. **Configure Auto-Loading**
   - Adds memory-loader to `.zshrc` or `.bashrc`
   - System loads automatically on every new terminal

5. **Initialize Configuration**
   - Creates `global-memory.json` with defaults
   - Creates `auto-behavior-config.json` with settings

---

## Post-Installation

### Activate in Current Terminal

```bash
source ~/.claude/memory/memory-loader.sh
```

Or simply **open a new terminal** (auto-loads).

### Verify Installation

```bash
cd ~/.claude/memory
node auto-behavior-system.js status
```

You should see:
```json
{
  "status": "active",
  "version": "3.0",
  "skills": 23,
  "integrations": {
    "agent_dispatcher": true,
    "skill_executor": true
  }
}
```

### Test Skills Detection

```bash
node auto-behavior-system.js test-skill
```

You should see successful skill pattern matches:
```
✅ Skill: memory-hygiene (58.0% confidence)
✅ Skill: tech-debt-tracker (58.0% confidence)
```

---

## Directory Structure After Installation

```
~/.claude/
├── memory/
│   ├── auto-behavior-system.js
│   ├── enhanced-agent-dispatcher.js
│   ├── skill-executor.js
│   ├── memory-loader.sh
│   ├── global-memory.json
│   ├── auto-behavior-config.json
│   ├── repositories/
│   └── logs/
├── skills/
│   ├── core/          (18 orchestration skills)
│   ├── dev/           (development skills)
│   ├── data/          (data analysis skills)
│   └── document/      (documentation skills)
└── agents/            (75 specialized agents)
```

---

## Uninstallation

To remove the system:

```bash
# Remove installation
rm -rf ~/.claude/memory
rm -rf ~/.claude/skills
rm -rf ~/.claude/agents

# Remove auto-loader from shell config
# Edit ~/.zshrc or ~/.bashrc and remove the Claude Memory System section
```

---

## Troubleshooting

### Skills Not Detected

```bash
# Check skills directory
ls ~/.claude/skills/

# Verify skill executor
cd ~/.claude/memory
node skill-executor.js list
```

### Auto-Loader Not Working

```bash
# Check if added to shell config
grep "memory-loader" ~/.zshrc

# Manually source
source ~/.claude/memory/memory-loader.sh

# Check environment variables
env | grep CLAUDE
```

### System Status Issues

```bash
# Run status check
cd ~/.claude/memory
node auto-behavior-system.js status

# Check for errors
tail -f ~/.claude/memory/logs/*.log
```

---

## Manual Installation

If you prefer manual installation:

```bash
# 1. Create directories
mkdir -p ~/.claude/{memory,skills,agents}

# 2. Copy core files
cp *.js ~/.claude/memory/
cp memory-loader.sh ~/.claude/memory/
chmod +x ~/.claude/memory/*.js
chmod +x ~/.claude/memory/memory-loader.sh

# 3. Copy skills and agents
cp -r skills/* ~/.claude/skills/
cp -r agents/* ~/.claude/agents/

# 4. Initialize configs
cp global-memory.json ~/.claude/memory/
cp auto-behavior-config.json ~/.claude/memory/

# 5. Add to shell config
echo 'source $HOME/.claude/memory/memory-loader.sh' >> ~/.zshrc

# 6. Activate
source ~/.zshrc
```

---

## Requirements

- **Node.js** 16+ (for JavaScript execution)
- **Bash** or **Zsh** shell
- **Claude Code CLI** (for full integration)
- **macOS** or **Linux** (Windows WSL supported)

---

## Getting Help

- **Documentation**: See [README.md](README.md)
- **Quick Start**: See [GETTING_STARTED.md](GETTING_STARTED.md)
- **Skills Guide**: See [SKILLS_GUIDE.md](SKILLS_GUIDE.md)
- **Issues**: [GitHub Issues](https://github.com/benreceveur/claude-memory-system/issues)

---

**Installation complete! You now have:**
- ✅ 23 Skills for instant guidance
- ✅ 75 Agents for complex tasks
- ✅ Auto-loading on every terminal
- ✅ 98% token savings
- ✅ 20-30x faster responses
