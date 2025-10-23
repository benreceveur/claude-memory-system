# Incident Triage Skill

## Description
Manages incident response including severity assessment, on-call handoffs, postmortem generation, and action item tracking.

## When to Use
- Production incidents
- On-call rotations
- Postmortem creation
- Incident retrospectives

## Incident Workflow

### 1. Detection & Alert
- Monitoring alerts triggered
- User reports received
- Automated health checks failed

### 2. Triage (5 minutes)
- **Severity Assessment**
  - P0/Critical: Complete outage, data loss
  - P1/High: Major functionality broken
  - P2/Medium: Degraded performance
  - P3/Low: Minor issues, workaround exists

- **Impact Assessment**
  - Users affected (% or count)
  - Business impact
  - Data integrity
  - Security implications

### 3. Response
- Assemble incident team
- Create incident channel
- Appoint incident commander
- Begin status updates
- Implement mitigation

### 4. Resolution
- Root cause identified
- Fix deployed
- Verification complete
- Monitoring confirmed

### 5. Postmortem
- Timeline documented
- Root cause analysis
- Action items identified
- Prevention measures
- Documentation updated

## Communication Template
```
INCIDENT: [Title]
SEVERITY: P0/P1/P2/P3
STATUS: Investigating/Mitigating/Resolved
IMPACT: [User impact description]
STARTED: [Timestamp]
UPDATES:
- [HH:MM] [Update]
ACTION ITEMS:
- [ ] [Action]
```

## Postmortem Template
1. **Summary**: What happened?
2. **Impact**: Who was affected?
3. **Timeline**: Key events
4. **Root Cause**: Why did it happen?
5. **Resolution**: How was it fixed?
6. **Action Items**: Prevention measures
7. **Lessons Learned**: What did we learn?

## Quality Checklist
- ✅ Severity correctly assessed
- ✅ Impact quantified
- ✅ Timeline documented
- ✅ Root cause identified
- ✅ Action items tracked
- ✅ Postmortem completed
- ✅ Team debriefed
