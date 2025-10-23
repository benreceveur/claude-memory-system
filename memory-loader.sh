#!/bin/bash
# Claude Memory System - Auto Loader
# Version 3.0
# Loads the memory system automatically for Claude Code

# Set memory system home
export CLAUDE_MEMORY_HOME="$HOME/.claude/memory"

# Create necessary directories if they don't exist
mkdir -p "$CLAUDE_MEMORY_HOME/repositories"
mkdir -p "$CLAUDE_MEMORY_HOME/logs"

# Initialize global memory if it doesn't exist
if [ ! -f "$CLAUDE_MEMORY_HOME/global-memory.json" ]; then
    cat > "$CLAUDE_MEMORY_HOME/global-memory.json" <<'EOF'
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
fi

# Initialize auto-behavior config if it doesn't exist
if [ ! -f "$CLAUDE_MEMORY_HOME/auto-behavior-config.json" ]; then
    cat > "$CLAUDE_MEMORY_HOME/auto-behavior-config.json" <<'EOF'
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
fi

# Set environment variables for the system
export CLAUDE_MEMORY_ENABLED=true
export CLAUDE_SKILLS_ORCHESTRATION=true
export AGENT_DEBUG=false

# Optional: Display status message (comment out if you want silent loading)
if [ -n "$CLAUDE_CODE_SESSION" ] || [ "$1" = "--verbose" ]; then
    echo "Claude Memory System v3.0 - Loaded"
    echo "  Skills Orchestration: Enabled"
    echo "  Memory Home: $CLAUDE_MEMORY_HOME"
fi

# Return success
return 0 2>/dev/null || exit 0
