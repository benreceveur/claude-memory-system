# Performance Profiler Skill

## Description
Analyzes application performance including CPU profiling, memory usage, database query optimization, and bottleneck identification.

## When to Use
- Application is slow
- High resource usage
- Before scaling decisions
- Performance regression testing
- Optimization initiatives

## Profiling Areas
1. **CPU Profiling**: Hot spots, function call times
2. **Memory Analysis**: Leaks, allocations, GC pressure
3. **Database**: Query performance, N+1 queries, missing indexes
4. **Network**: API latency, payload sizes
5. **Frontend**: Load time, rendering, bundle size

## Tools
- **Python**: cProfile, memory_profiler, py-spy
- **JavaScript**: Chrome DevTools, Clinic.js
- **Database**: EXPLAIN plans, slow query logs
- **APM**: DataDog, New Relic, Prometheus

## Metrics to Track
- Response time (p50, p95, p99)
- Throughput (requests/sec)
- Error rate
- CPU utilization
- Memory usage
- Database query time
- Cache hit rate

## Optimization Strategies
1. Caching (Redis, CDN)
2. Database indexes
3. Query optimization
4. Code optimization
5. Load balancing
6. Asynchronous processing
7. Resource compression

## Quality Checklist
- ✅ Bottlenecks identified
- ✅ Baseline metrics established
- ✅ Optimization opportunities listed
- ✅ Performance budget defined
- ✅ Monitoring in place
