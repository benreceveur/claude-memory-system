# Memory Hygiene Skill

## Description
Maintains the Claude Memory System by cleaning duplicates, validating schema, optimizing patterns, and ensuring data quality.

## When to Use
- Weekly/monthly maintenance
- Memory system issues
- Performance degradation
- Before major updates

## Maintenance Tasks

### 1. Duplicate Detection
- Find duplicate patterns
- Merge similar entries
- Remove redundant data
- Consolidate rules

### 2. Schema Validation
- Verify JSON structure
- Check required fields
- Validate data types
- Fix formatting issues

### 3. Pattern Optimization
- Identify unused patterns
- Merge overlapping patterns
- Update stale patterns
- Improve pattern accuracy

### 4. Data Quality
- Remove obsolete entries
- Update outdated information
- Fix broken references
- Validate relationships

### 5. Performance Optimization
- Clean old cache files
- Optimize file sizes
- Index optimization
- Query performance

## Cleanup Operations
```bash
# Clean cache
rm -rf /tmp/claude-*

# Validate JSON
jq . ~/.claude/memory/global-memory.json

# Check file sizes
du -sh ~/.claude/memory/*

# Find duplicates
# (custom logic needed)
```

## Best Practices
- Regular maintenance schedule
- Backup before cleanup
- Validate after changes
- Monitor performance impact
- Document changes
- Test after cleanup

## Quality Checklist
- ✅ No duplicate patterns
- ✅ Schema valid
- ✅ No broken references
- ✅ Optimized for performance
- ✅ Backup created
- ✅ Changes documented
- ✅ System tested
