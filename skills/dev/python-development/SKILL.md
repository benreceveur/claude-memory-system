# Python Development Skill

## Description
Professional Python development following PEP 8 standards, best practices, and modern patterns. Includes testing, documentation, and packaging.

## When to Use
- Writing Python scripts or applications
- Creating Python libraries
- API development
- Data processing pipelines
- Automation scripts

## Best Practices
1. **Code Style**
   - Follow PEP 8 style guide
   - Use type hints (Python 3.5+)
   - Docstrings for all public functions/classes
   - Meaningful variable names

2. **Project Structure**
   ```
   project/
   ├── src/
   │   └── package/
   │       ├── __init__.py
   │       └── module.py
   ├── tests/
   │   └── test_module.py
   ├── pyproject.toml
   ├── README.md
   └── .gitignore
   ```

3. **Testing**
   - pytest for unit tests
   - Coverage >80%
   - Fixtures for test data
   - Mock external dependencies

4. **Dependency Management**
   - Use virtual environments (venv, conda)
   - Pin dependencies (requirements.txt or pyproject.toml)
   - Separate dev and production dependencies

5. **Error Handling**
   - Use specific exceptions
   - Handle errors gracefully
   - Log errors appropriately
   - Clean resource management (context managers)

## Common Patterns

### Context Managers
```python
class DatabaseConnection:
    def __enter__(self):
        self.conn = create_connection()
        return self.conn
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()
```

### Decorators
```python
from functools import wraps

def retry(max_attempts=3):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
        return wrapper
    return decorator
```

### Type Hints
```python
from typing import List, Dict, Optional

def process_data(
    items: List[Dict[str, any]],
    threshold: float = 0.5
) -> Optional[Dict[str, any]]:
    pass
```

## Quality Checklist
- ✅ PEP 8 compliant (use black, flake8)
- ✅ Type hints added
- ✅ Docstrings present
- ✅ Tests written (pytest)
- ✅ No security issues (bandit)
- ✅ Dependencies managed
- ✅ Error handling comprehensive
