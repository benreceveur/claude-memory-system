# Release Orchestrator Skill

## Description
Manages automated release processes including versioning, changelog generation, deployment, and rollback procedures.

## When to Use
- Creating releases
- Version bumping
- Deployment automation
- Rollback procedures

## Release Checklist
1. **Pre-Release**
   - ✅ All tests passing
   - ✅ Code review completed
   - ✅ Documentation updated
   - ✅ CHANGELOG updated
   - ✅ Version bumped (semver)
   - ✅ Release notes drafted

2. **Release**
   - ✅ Tag created
   - ✅ Build artifacts generated
   - ✅ Deploy to staging
   - ✅ Smoke tests passed
   - ✅ Deploy to production
   - ✅ Health checks passed

3. **Post-Release**
   - ✅ Monitoring confirmed
   - ✅ Announcement sent
   - ✅ Documentation published
   - ✅ Rollback plan ready

## Versioning (SemVer)
- **Major** (x.0.0): Breaking changes
- **Minor** (0.x.0): New features, backward compatible
- **Patch** (0.0.x): Bug fixes

## Deployment Strategies
- Blue-Green: Zero downtime
- Canary: Gradual rollout
- Rolling: Sequential updates
- Feature Flags: Gradual feature activation

## Quality Checklist
- ✅ Version bumped correctly
- ✅ Changelog complete
- ✅ Tests passing
- ✅ Deployed successfully
- ✅ Monitoring active
- ✅ Rollback tested
