# Container Validator Skill

## Description
Validates Docker containers and Kubernetes configurations for best practices, security, and optimization.

## When to Use
- Before deploying containers
- Container security audits
- Image optimization
- Kubernetes manifest validation

## Validation Categories

### Docker Best Practices
- Use official base images
- Minimize layer count
- Multi-stage builds
- Non-root user
- Health checks defined
- Minimal installed packages
- .dockerignore present
- Security scanning passed

### Kubernetes Best Practices
- Resource limits/requests set
- Liveness/readiness probes
- Pod security policies
- Network policies defined
- Secrets management
- RBAC configured
- Labels and annotations
- Namespace isolation

### Security Checks
- No hardcoded secrets
- Base image vulnerabilities
- Minimal attack surface
- Read-only root filesystem
- No privileged mode
- AppArmor/SELinux policies

### Optimization
- Image size minimized
- Layer caching optimized
- Build cache utilized
- Multi-platform support
- Efficient dependency installation

## Quality Checklist
- ✅ Security scan passed
- ✅ Best practices followed
- ✅ Resource limits set
- ✅ Health checks configured
- ✅ Image size optimized
- ✅ No vulnerabilities found
