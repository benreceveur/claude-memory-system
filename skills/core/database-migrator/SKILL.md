# Database Migrator Skill

## Description
Manages database schema migrations safely with rollback support, version control, and zero-downtime strategies.

## When to Use
- Adding/modifying database tables
- Changing column types
- Adding indexes
- Data migrations
- Schema refactoring

## Migration Strategies
1. **Additive Changes**: Safe, backward compatible
2. **Multi-Phase**: Gradual rollout with backward compatibility
3. **Blue-Green**: Parallel databases, switch over
4. **Expand-Contract**: Add new, migrate, remove old

## Safety Checklist
- ✅ Migration is reversible (rollback script)
- ✅ Tested on staging environment
- ✅ Backup created before migration
- ✅ Performance impact assessed
- ✅ Downtime minimized/eliminated
- ✅ Index creation non-blocking
- ✅ Large data migrations batched

## Best Practices
- Version migrations sequentially
- Never modify committed migrations
- Test rollback procedure
- Monitor migration duration
- Use transactions when possible
- Add indexes concurrently (PostgreSQL)
- Avoid large table locks

## Migration Tools
- Alembic (Python/SQLAlchemy)
- Flyway (Java)
- Liquibase (Multi-platform)
- Rails migrations
- Prisma migrations

## Zero-Downtime Techniques
1. Add column as nullable first
2. Backfill data in background
3. Make column required later
4. Create indexes concurrently
5. Use feature flags

## Quality Checklist
- ✅ Migration tested locally
- ✅ Tested in staging
- ✅ Rollback tested
- ✅ Performance acceptable
- ✅ No data loss
- ✅ Schema version updated
