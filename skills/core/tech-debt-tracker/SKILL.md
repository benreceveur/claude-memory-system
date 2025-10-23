# Technical Debt Tracker Skill

## Description
Identifies, measures, and prioritizes technical debt in codebases. Analyzes code quality metrics, duplication, complexity, and maintainability to create actionable technical debt reports.

## When to Use
- Sprint planning and estimation
- Code quality audits
- Refactoring prioritization
- Project health assessments

## Key Metrics
- Cyclomatic complexity
- Code duplication percentage
- Test coverage gaps
- Dependency age and vulnerabilities
- TODO/FIXME comments
- Code smell patterns

## Analysis Areas
1. **Code Quality**
   - Complexity metrics (cyclomatic, cognitive)
   - Duplication detection
   - Code smell identification
   - Naming conventions

2. **Architecture**
   - Circular dependencies
   - Tight coupling
   - Missing abstractions
   - Violation of SOLID principles

3. **Testing**
   - Coverage gaps
   - Flaky tests
   - Missing integration tests
   - Outdated test data

4. **Dependencies**
   - Outdated packages
   - Known vulnerabilities
   - License compliance
   - Deprecated APIs

5. **Documentation**
   - Missing docstrings/comments
   - Outdated documentation
   - API documentation gaps

## Prioritization Framework
- **Critical**: Security vulnerabilities, broken functionality
- **High**: Performance issues, major code smells
- **Medium**: Moderate duplication, complexity
- **Low**: Minor style issues, TODO comments

## Output Format
- Technical debt summary report
- Prioritized issue list
- Effort estimates (story points)
- Refactoring recommendations
- Trend analysis (if historical data available)

## Tools Integration
- SonarQube metrics
- Code Climate analysis
- CodeScene behavioral analysis
- Custom static analysis

## Best Practices
- Run regularly (weekly/monthly)
- Track trends over time
- Link debt items to sprints
- Allocate 15-20% of sprint capacity to debt reduction
- Focus on high-impact, low-effort items first

## Quality Checklist
- ✅ All code files analyzed
- ✅ Metrics calculated and normalized
- ✅ Issues prioritized by impact
- ✅ Actionable recommendations provided
- ✅ Trends identified if historical data exists
