# API Documentor Skill

## Description
Generates comprehensive API documentation in OpenAPI/Swagger format, including endpoints, request/response schemas, authentication, and examples.

## When to Use
- Creating new APIs
- Updating existing API documentation
- Generating client SDKs
- API versioning

## Supported Formats
- OpenAPI 3.x (Swagger)
- GraphQL schemas
- REST API documentation
- gRPC proto files
- API Blueprint

## Documentation Elements
1. **Endpoints**: All routes with HTTP methods
2. **Parameters**: Path, query, header, body
3. **Request/Response**: JSON schemas, examples
4. **Authentication**: OAuth, API keys, JWT
5. **Error Codes**: Standard HTTP codes + custom
6. **Rate Limiting**: Throttling policies
7. **Versioning**: API version strategy
8. **Examples**: cURL, language-specific code

## Best Practices
- Keep documentation in sync with code
- Include realistic examples
- Document error responses
- Specify required vs optional parameters
- Use standard HTTP status codes
- Version your API
- Provide SDKs when possible

## Quality Checklist
- ✅ All endpoints documented
- ✅ Request/response schemas complete
- ✅ Examples provided
- ✅ Error codes documented
- ✅ Authentication explained
- ✅ Interactive documentation (Swagger UI)
