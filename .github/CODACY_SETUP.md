# Codacy Setup Guide

This repository is configured for automated code quality analysis with Codacy.

## Quick Setup

### 1. Enable Codacy for the Repository

1. Go to [Codacy](https://app.codacy.com/)
2. Sign in with GitHub
3. Click "Add repository"
4. Select `benreceveur/claude-memory-system`
5. Click "Add repository"

### 2. Get Your Project Token

1. In Codacy, go to your repository settings
2. Navigate to **Integrations** → **Project API**
3. Copy the **Project API Token**

### 3. Add GitHub Secret

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `CODACY_PROJECT_TOKEN`
5. Value: Paste the token from Codacy
6. Click **Add secret**

### 4. Update README Badge

1. In Codacy, go to your repository settings
2. Navigate to **Settings** → **Badges**
3. Copy the Project ID from the badge URL
4. Update `README.md` and replace `PROJECT_ID` with your actual project ID

```markdown
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/YOUR_PROJECT_ID)](...)
```

## Configuration Files

The repository includes:

- **`.codacy.yml`** - Main Codacy configuration
  - Enables ESLint, ShellCheck, Markdownlint, Trivy
  - Configures exclusions and duplication settings

- **`.eslintrc.json`** - JavaScript linting rules
  - Node.js environment
  - ES2021 standards
  - Consistent code style

- **`.github/workflows/codacy.yml`** - GitHub Actions workflow
  - Runs on push and pull requests
  - Uploads results to GitHub Security tab

## Enabled Tools

### ESLint
- JavaScript code quality and style checking
- Enforces consistent code style
- Detects potential bugs and anti-patterns

### ShellCheck
- Shell script analysis
- Best practices for bash scripts
- Security issue detection

### Markdownlint
- Markdown formatting
- Consistent documentation style
- Link validation

### Trivy
- Security vulnerability scanning
- Dependency vulnerability detection
- Container image scanning (if applicable)

## Quality Gates

Codacy will automatically:
- Analyze all commits and pull requests
- Report code quality issues
- Track code coverage (when configured)
- Detect security vulnerabilities
- Monitor code duplication
- Calculate complexity metrics

## Excluding Files

Files are excluded via `.codacy.yml`:
- `node_modules/**` - Dependencies
- `agents/**` - Agent patterns (duplication allowed)
- `skills/**` - Skill patterns (duplication allowed)
- Build and dist directories

## Workflow

1. **Commit/PR Created** → Codacy Analysis runs automatically
2. **Analysis Complete** → Results posted to PR
3. **Issues Found** → Review and fix
4. **Re-push** → Re-analysis occurs

## Manual Analysis

To run Codacy locally (requires Codacy CLI):

```bash
# Install Codacy CLI
brew tap codacy/tap
brew install codacy

# Run analysis
codacy analyze --project-token $CODACY_PROJECT_TOKEN
```

## Integration with MCP

The repository includes Codacy MCP integration instructions at:
`.github/instructions/codacy.instructions.md`

This enables automatic code quality checks when using Claude Code with Codacy's MCP server.

## Monitoring

View analysis results:
- **Codacy Dashboard**: [app.codacy.com](https://app.codacy.com)
- **GitHub Security**: Repository → Security → Code scanning
- **PR Comments**: Automatic comments on pull requests

## Customization

### Adjust Quality Settings

Edit `.codacy.yml` to:
- Enable/disable specific tools
- Adjust duplication thresholds
- Configure coverage requirements
- Set custom exclusions

### Modify Linting Rules

Edit `.eslintrc.json` to:
- Change code style preferences
- Add custom rules
- Adjust severity levels

## Troubleshooting

### Workflow Not Running

1. Check GitHub Actions are enabled
2. Verify `CODACY_PROJECT_TOKEN` secret exists
3. Review workflow file syntax

### Badge Not Showing

1. Ensure repository is added to Codacy
2. Update PROJECT_ID in README.md
3. Check badge URL format

### Analysis Failing

1. Check Codacy dashboard for errors
2. Verify configuration file syntax
3. Review tool-specific logs

## Support

- **Codacy Docs**: [docs.codacy.com](https://docs.codacy.com)
- **GitHub Issues**: Report integration issues
- **Codacy Support**: support@codacy.com

## Benefits

- ✅ Automated code quality checks
- ✅ Security vulnerability detection
- ✅ Consistent code style enforcement
- ✅ Early bug detection
- ✅ Technical debt tracking
- ✅ PR quality gates
- ✅ Integration with GitHub Security
