# Code Formatter Skill

## Description
Formats code across multiple languages using industry-standard tools (Prettier, Black, ESLint, etc.). Ensures consistent code style and automatically fixes formatting issues.

## When to Use
- Before committing code
- When code style is inconsistent
- During code reviews
- Setting up new projects

## Supported Languages
- JavaScript/TypeScript (Prettier, ESLint)
- Python (Black, autopep8, isort)
- Go (gofmt)
- Rust (rustfmt)
- CSS/SCSS (Prettier)
- HTML (Prettier)
- JSON/YAML (Prettier)

## Usage
This skill will:
1. Detect the programming language
2. Apply appropriate formatting tool
3. Fix common style issues automatically
4. Report any remaining issues

## Best Practices
- Always format before committing
- Use project-specific configuration files (.prettierrc, .eslintrc, pyproject.toml)
- Run in CI/CD pipeline
- Combine with linting for best results

## Configuration Files
- JavaScript: `.prettierrc`, `.eslintrc.json`
- Python: `pyproject.toml`, `.flake8`
- EditorConfig: `.editorconfig` (cross-language)

## Common Commands
```bash
# JavaScript/TypeScript
npx prettier --write .
npx eslint --fix .

# Python
black .
isort .

# Go
gofmt -w .

# Rust
cargo fmt
```

## Quality Checklist
- ✅ Code passes formatter without errors
- ✅ Indentation is consistent
- ✅ Line length within limits
- ✅ Import statements organized
- ✅ Trailing whitespace removed
