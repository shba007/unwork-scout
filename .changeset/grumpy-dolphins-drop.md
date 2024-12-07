---
'api-unwork': minor
---

feat: implement job scouting and filtering

- Adds support for scouting jobs from various sources like Remotive and Naukri.
- Implements a filtering mechanism to refine job results based on criteria such as category, location, date posted, and sorting order.
- Introduces database schema and migrations to store job data.
- Sets up scheduled tasks to periodically scout for new jobs.
- Adds necessary API endpoints for health checks and filtering.
- Includes utility functions for formatting time, managing promise pools, and handling query parameters.
- Updates documentation to reflect the new features.
- Improves project setup with Dockerfile, dockerignore, and environment variables.
