# PR Author & Reviewer Skill

## Description
Comprehensive pull request quality analysis covering code quality, security, performance, testing, and documentation. Provides detailed review feedback and merge-readiness assessment.

## When to Use
- Before submitting a pull request
- During code review process
- Pre-merge quality gates
- Team code quality standards enforcement

## Review Checklist

### 1. Code Quality
- ✅ Follows project style guide
- ✅ No code duplication
- ✅ Appropriate use of design patterns
- ✅ SOLID principles adhered to
- ✅ Error handling comprehensive
- ✅ No commented-out code
- ✅ No debug statements (console.log, print, etc.)

### 2. Security
- ✅ No hardcoded secrets/credentials
- ✅ Input validation present
- ✅ SQL injection prevention
- ✅ XSS prevention
- ✅ CSRF protection where needed
- ✅ Proper authentication/authorization
- ✅ Secure dependencies (no known vulnerabilities)

### 3. Performance
- ✅ No N+1 queries
- ✅ Efficient algorithms used
- ✅ Appropriate caching
- ✅ No memory leaks
- ✅ Database indexes considered
- ✅ Large file handling optimized

### 4. Testing
- ✅ Unit tests added/updated
- ✅ Integration tests where appropriate
- ✅ Test coverage meets threshold (80%+)
- ✅ Edge cases tested
- ✅ Error scenarios tested
- ✅ Tests are deterministic (no flakiness)

### 5. Documentation
- ✅ README updated if needed
- ✅ API documentation current
- ✅ Code comments for complex logic
- ✅ CHANGELOG updated
- ✅ Migration guide if breaking changes

### 6. Git Hygiene
- ✅ Commits are atomic and logical
- ✅ Commit messages are clear
- ✅ No merge conflicts
- ✅ Branch up to date with main
- ✅ No unnecessary files committed

### 7. Backwards Compatibility
- ✅ No breaking changes (or documented)
- ✅ Database migrations safe
- ✅ API versions handled
- ✅ Deprecation warnings added

## PR Description Template
```markdown
## Summary
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Refactoring

## Testing
How was this tested?

## Screenshots (if applicable)

## Checklist
- [ ] Tests pass locally
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Reviewed my own code
```

## Best Practices for PR Authors
1. Keep PRs small (<400 lines)
2. One concern per PR
3. Self-review before requesting review
4. Add tests with your code
5. Update documentation
6. Write clear PR description
7. Link to relevant issues

## Best Practices for Reviewers
1. Review within 24 hours
2. Focus on logic, not style (use linters)
3. Ask questions, don't command
4. Approve after all concerns addressed
5. Test the code if possible
6. Suggest improvements, don't demand perfection

## Quality Checklist
- ✅ All review categories checked
- ✅ No critical security issues
- ✅ Tests present and passing
- ✅ Documentation updated
- ✅ PR description complete
- ✅ Ready to merge
