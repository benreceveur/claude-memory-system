# Security Scanner Skill

## Description
Comprehensive security analysis including SAST (Static Application Security Testing), dependency vulnerability scanning, secrets detection, and OWASP compliance checking.

## When to Use
- Before deploying to production
- Regular security audits
- After adding new dependencies
- Compliance requirements (SOC2, ISO 27001)

## Scan Categories

### 1. Static Application Security Testing (SAST)
- SQL injection vulnerabilities
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Insecure deserialization
- XML external entity (XXE) attacks
- Server-side request forgery (SSRF)
- Path traversal vulnerabilities
- Command injection

### 2. Secrets Detection
- API keys and tokens
- Passwords and credentials
- Private keys (SSH, SSL)
- Database connection strings
- OAuth tokens
- AWS/GCP/Azure credentials
- Encryption keys

### 3. Dependency Vulnerabilities
- Known CVEs in dependencies
- Outdated packages with security patches
- Dependency confusion risks
- License compliance issues
- Transitive dependency vulnerabilities

### 4. Infrastructure as Code (IaC) Security
- Terraform misconfigurations
- Docker security issues
- Kubernetes security policies
- Cloud resource misconfigurations
- Network security group rules
- S3 bucket policies

### 5. OWASP Top 10 Coverage
1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable and Outdated Components
7. Identification and Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery (SSRF)

## Tools Integration
- **SAST**: Bandit (Python), ESLint security plugins, Semgrep
- **Secrets**: TruffleHog, git-secrets, detect-secrets
- **Dependencies**: npm audit, pip-audit, Snyk, Dependabot
- **IaC**: Checkov, tfsec, kube-bench
- **Container**: Trivy, Clair, Docker Bench

## Severity Levels
- **Critical**: Immediate exploitation possible, severe impact
- **High**: Likely exploitation, significant impact
- **Medium**: Possible exploitation, moderate impact  
- **Low**: Difficult to exploit, minimal impact
- **Info**: Best practice violations, no direct security impact

## Remediation Priority
1. **Critical** - Fix immediately (within 24 hours)
2. **High** - Fix within 7 days
3. **Medium** - Fix within 30 days
4. **Low** - Fix in next sprint
5. **Info** - Fix as technical debt

## Output Report
- Executive summary
- Vulnerability count by severity
- Detailed findings with:
  - Location (file:line)
  - Description
  - Impact assessment
  - Remediation steps
  - References (CWE, CVE, OWASP)
- Compliance status
- Historical trend

## Best Practices
- Run security scans in CI/CD pipeline
- Fail builds on critical/high severity issues
- Scan on every PR
- Regular dependency updates
- Secret rotation policy
- Security training for developers
- Penetration testing for critical systems

## False Positive Handling
- Document legitimate exceptions
- Use suppression comments with justification
- Regular review of suppressions
- Security team approval for exceptions

## Quality Checklist
- ✅ All security scan types completed
- ✅ No critical vulnerabilities
- ✅ High severity issues triaged
- ✅ False positives documented
- ✅ Compliance requirements met
- ✅ Report generated and stored
