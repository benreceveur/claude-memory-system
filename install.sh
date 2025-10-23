#!/bin/bash

# Claude Memory System - Turnkey Installation Script
# Version 3.0
# Installs the complete memory system with Skills and Agents

set -e  # Exit on error

echo "================================================"
echo "Claude Memory System v3.0 - Installation"
echo "================================================"
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
INSTALL_DIR="$HOME/.claude"
MEMORY_DIR="$INSTALL_DIR/memory"

echo "📦 Installation Configuration:"
echo "  Source: $SCRIPT_DIR"
echo "  Target: $INSTALL_DIR"
echo ""

# Create directories
echo "📁 Creating directories..."
mkdir -p "$MEMORY_DIR"
mkdir -p "$INSTALL_DIR/skills"
mkdir -p "$INSTALL_DIR/agents"
mkdir -p "$MEMORY_DIR/repositories"
mkdir -p "$MEMORY_DIR/logs"
echo "  ✅ Directories created"
echo ""

# Copy core system files
echo "🔧 Installing core system files..."
cp "$SCRIPT_DIR/auto-behavior-system.js" "$MEMORY_DIR/"
cp "$SCRIPT_DIR/enhanced-agent-dispatcher.js" "$MEMORY_DIR/"
cp "$SCRIPT_DIR/skill-executor.js" "$MEMORY_DIR/"
cp "$SCRIPT_DIR/memory-loader.sh" "$MEMORY_DIR/"
chmod +x "$MEMORY_DIR"/*.js
chmod +x "$MEMORY_DIR/memory-loader.sh"
echo "  ✅ Core files installed"
echo ""

# Copy Skills
echo "🎯 Installing Skills..."
if [ -d "$SCRIPT_DIR/skills" ]; then
    cp -r "$SCRIPT_DIR/skills/"* "$INSTALL_DIR/skills/"
    SKILLS_COUNT=$(find "$INSTALL_DIR/skills" -name "SKILL.md" | wc -l | tr -d ' ')
    echo "  ✅ $SKILLS_COUNT skills installed"
else
    echo "  ⚠️  Skills directory not found in source"
fi
echo ""

# Copy Agents
echo "🤖 Installing Agents..."
if [ -d "$SCRIPT_DIR/agents" ]; then
    cp -r "$SCRIPT_DIR/agents/"* "$INSTALL_DIR/agents/"
    AGENTS_COUNT=$(ls "$INSTALL_DIR/agents/"*.md 2>/dev/null | wc -l | tr -d ' ')
    echo "  ✅ $AGENTS_COUNT agents installed"
else
    echo "  ⚠️  Agents directory not found in source"
fi
echo ""

# Initialize configuration files
echo "⚙️  Initializing configuration..."

# Create global-memory.json if it doesn't exist
if [ ! -f "$MEMORY_DIR/global-memory.json" ]; then
    cat > "$MEMORY_DIR/global-memory.json" << 'EOF'
{
  "version": "3.0",
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
    },
    "enforcement_rules": {
      "always_review_existing_code": true,
      "enforce_shared_services": true,
      "respect_repository_patterns": true
    }
  },
  "agent_preferences": {
    "frontend": ["frontend-developer"],
    "backend": ["python-pro", "javascript-pro"],
    "debugging": ["debugger"],
    "architecture": ["backend-architect"]
  },
  "skills": {
    "enabled": true,
    "confidence_threshold": 0.5,
    "auto_dispatch": true
  }
}
EOF
    echo "  ✅ Created global-memory.json"
else
    echo "  ℹ️  global-memory.json already exists (keeping existing)"
fi

# Create auto-behavior-config.json if it doesn't exist
if [ ! -f "$MEMORY_DIR/auto-behavior-config.json" ]; then
    cat > "$MEMORY_DIR/auto-behavior-config.json" << 'EOF'
{
  "enableSkillsOrchestration": true,
  "skillConfidenceThreshold": 0.5,
  "confidenceThreshold": 0.7,
  "enableAutoDispatch": true,
  "enableMemoryIntegration": true,
  "mandatoryAgents": true,
  "version": "3.0"
}
EOF
    echo "  ✅ Created auto-behavior-config.json"
else
    echo "  ℹ️  auto-behavior-config.json already exists (keeping existing)"
fi

echo ""

# Configure shell auto-loading
echo "🔗 Configuring shell auto-loading..."

SHELL_RC=""
if [ -n "$ZSH_VERSION" ]; then
    SHELL_RC="$HOME/.zshrc"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_RC="$HOME/.bashrc"
fi

if [ -n "$SHELL_RC" ]; then
    # Check if already configured
    if grep -q "claude-memory-system" "$SHELL_RC" 2>/dev/null || grep -q "memory-loader.sh" "$SHELL_RC" 2>/dev/null; then
        echo "  ℹ️  Shell already configured (found in $SHELL_RC)"
    else
        # Add to shell RC
        cat >> "$SHELL_RC" << 'EOF'

# Claude Memory System - Auto Loader
# Load the memory system for Claude Code
if [ -f "$HOME/.claude/memory/memory-loader.sh" ]; then
    source "$HOME/.claude/memory/memory-loader.sh"
fi
EOF
        echo "  ✅ Added auto-loader to $SHELL_RC"
        echo "  ℹ️  Run 'source $SHELL_RC' or open a new terminal to activate"
    fi
else
    echo "  ⚠️  Could not detect shell type (zsh or bash)"
    echo "  ℹ️  Manually add this to your .zshrc or .bashrc:"
    echo "      source \$HOME/.claude/memory/memory-loader.sh"
fi

echo ""

# Test installation
echo "🧪 Testing installation..."
cd "$MEMORY_DIR"

# Test auto-behavior system
if node auto-behavior-system.js status > /dev/null 2>&1; then
    echo "  ✅ Auto-behavior system: Working"
else
    echo "  ❌ Auto-behavior system: Failed"
    exit 1
fi

# Test skill executor
SKILL_COUNT=$(node skill-executor.js list 2>/dev/null | grep -c '"name"' || echo "0")
if [ "$SKILL_COUNT" -gt 0 ]; then
    echo "  ✅ Skill executor: Working ($SKILL_COUNT skills detected)"
else
    echo "  ⚠️  Skill executor: No skills detected"
fi

# Test agent dispatcher
if node enhanced-agent-dispatcher.js analyze "test" > /dev/null 2>&1; then
    echo "  ✅ Agent dispatcher: Working"
else
    echo "  ❌ Agent dispatcher: Failed"
    exit 1
fi

echo ""
echo "================================================"
echo "✅ Installation Complete!"
echo "================================================"
echo ""
echo "📊 Installed Components:"
echo "  • Memory System: v3.0"
echo "  • Skills: $SKILLS_COUNT"
echo "  • Agents: $AGENTS_COUNT"
echo "  • Auto-loader: Configured"
echo ""
echo "🚀 Next Steps:"
echo "  1. Load the system in this terminal:"
echo "     source ~/.claude/memory/memory-loader.sh"
echo ""
echo "  2. Or open a new terminal (auto-loads)"
echo ""
echo "  3. Verify installation:"
echo "     cd ~/.claude/memory"
echo "     node auto-behavior-system.js status"
echo ""
echo "📚 Documentation:"
echo "  • README.md - System overview"
echo "  • GETTING_STARTED.md - Quick start guide"
echo "  • SKILLS_GUIDE.md - Skills reference"
echo ""
echo "🎉 Claude Memory System is ready to use!"
echo "================================================"
