# Documentation Sync Skill

## Description
Detects and fixes documentation drift by ensuring code and documentation stay in sync. Identifies outdated docs and missing documentation.

## When to Use
- Code changes made
- API updates
- Refactoring
- Documentation audits

## Checks Performed
1. **API Documentation**
   - Endpoints match implementation
   - Parameters documented
   - Response schemas current
   - Examples valid

2. **Code Documentation**
   - Docstrings present
   - Type annotations correct
   - Comments accurate
   - TODOs addressed

3. **User Documentation**
   - Getting started guide current
   - Tutorials work
   - Configuration docs accurate
   - Screenshots up to date

4. **Infrastructure Docs**
   - Architecture diagrams current
   - Deployment docs accurate
   - Environment configs documented

## Documentation Types
- README files
- API docs (OpenAPI)
- Code comments/docstrings
- User guides
- Architecture docs
- Runbooks

## Best Practices
- Update docs with code changes
- Automated doc generation where possible
- Review docs in PRs
- Version docs with code
- Keep examples runnable
- Test code examples

## Quality Checklist
- ✅ All APIs documented
- ✅ Examples work
- ✅ No outdated information
- ✅ Missing docs identified
- ✅ Docs versioned
- ✅ Search functionality works
