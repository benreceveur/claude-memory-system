# Dependency Guardian Skill

## Description
Monitors, updates, and secures project dependencies. Tracks vulnerabilities, licenses, and version updates.

## When to Use
- Regular dependency audits (weekly/monthly)
- Before major releases
- After security advisories
- License compliance checks

## Checks Performed
1. **Security**: Known CVEs, vulnerability severity
2. **Updates**: Outdated packages, breaking changes
3. **Licenses**: GPL, MIT, Apache compatibility
4. **Health**: Package maintenance, download stats
5. **Duplicates**: Multiple versions of same package

## Tools
- npm audit / yarn audit
- pip-audit / safety
- Snyk / Dependabot
- License checkers
- Renovate / Greenkeeper

## Update Strategy
- **Patch** (1.0.x): Auto-merge if tests pass
- **Minor** (1.x.0): Review and test
- **Major** (x.0.0): Careful review, breaking changes

## Quality Checklist
- ✅ No critical vulnerabilities
- ✅ All licenses compatible
- ✅ Dependencies up to date
- ✅ No duplicate dependencies
- ✅ Lockfile committed
