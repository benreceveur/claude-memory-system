# Technical Writing Skill

## Description
Create clear, concise technical documentation including user manuals, API docs, technical guides, and README files.

## When to Use
- API documentation
- User manuals
- Getting started guides
- Architecture documentation
- Runbooks

## Document Structure

### README Template
```markdown
# Project Name

Brief description (one sentence).

## Features
- Feature 1
- Feature 2

## Installation
\`\`\`bash
npm install package-name
\`\`\`

## Quick Start
\`\`\`javascript
const example = require('package-name');
example.run();
\`\`\`

## Documentation
Link to full docs

## Contributing
Link to contribution guide

## License
MIT
```

### API Documentation
```markdown
### GET /api/users

Retrieves a list of users.

**Parameters**
- `page` (integer, optional): Page number (default: 1)
- `limit` (integer, optional): Items per page (default: 10)

**Response**
\`\`\`json
{
  "users": [...],
  "total": 100,
  "page": 1
}
\`\`\`

**Errors**
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing authentication
- `500 Internal Server Error`: Server error
```

## Writing Principles
1. **Clarity**: Simple language, avoid jargon
2. **Conciseness**: Remove unnecessary words
3. **Accuracy**: Technically correct
4. **Consistency**: Same terms throughout
5. **Accessibility**: Consider all skill levels
6. **Actionable**: Clear next steps

## Best Practices
- Use active voice
- Include code examples
- Add screenshots for UI
- Version documentation
- Test examples (they should work)
- Use meaningful headings
- Table of contents for long docs

## Quality Checklist
- ✅ Clear structure
- ✅ Code examples work
- ✅ No jargon (or explained)
- ✅ Screenshots current
- ✅ Links functional
- ✅ Spelling/grammar checked
- ✅ Technically accurate
