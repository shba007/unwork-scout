# unwork-scout

## v0.1.4

[compare changes](https://github.com/shba007/unwork-scout/compare/v0.1.3...v0.1.4)

### 🩹 Fixes

- Update docker stack deploy service name and improve formatting in docker-compose files ([16526aa](https://github.com/shba007/unwork-scout/commit/16526aa))

### 💅 Refactors

- Rename Docker Compose project from 'unwork-dev' to 'unwork' ([bb1d60c](https://github.com/shba007/unwork-scout/commit/bb1d60c))

### 🏡 Chore

- Update docker-compose configurations updated ci/cd pipeline ([c87ac6c](https://github.com/shba007/unwork-scout/commit/c87ac6c))

### ❤️ Contributors

- Shba007 ([@shba007](https://github.com/shba007))
- Shirsendu Bairagi ([@shba007](https://github.com/shba007))

## v0.1.3

[compare changes](https://github.com/shba007/unwork-scout/compare/v0.1.2...v0.1.3)

### 🚀 Enhancements

- **prisma:** Add docker swam, node -> bun, changesets -> changelogen ([2fee81f](https://github.com/shba007/unwork-scout/commit/2fee81f))

### 💅 Refactors

- Moved chromium from docker image to browserless image ([3a9e39f](https://github.com/shba007/unwork-scout/commit/3a9e39f))
- Update Docker Compose configuration for scout service ([02a1a5a](https://github.com/shba007/unwork-scout/commit/02a1a5a))
- Rename Docker Compose project from 'unwork-dev' to 'unwork' ([b1f1255](https://github.com/shba007/unwork-scout/commit/b1f1255))
- Switch from Node.js to Bun in Dockerfile for improved performance ([4de4fe3](https://github.com/shba007/unwork-scout/commit/4de4fe3))
- Update prisma import paths to use server/utils for consistency ([384c24c](https://github.com/shba007/unwork-scout/commit/384c24c))

### 🏡 Chore

- Update deployment script and package dependencies ([bdd623d](https://github.com/shba007/unwork-scout/commit/bdd623d))

### ❤️ Contributors

- Shba007 ([@shba007](https://github.com/shba007))
- Shirsendu Bairagi ([@shba007](https://github.com/shba007))

## 0.1.2

### Patch Changes

- 3256c8c: refactor: update Docker configuration and improve We Work Remotely Scout task

## 0.1.1

### Patch Changes

- b94e53e: fix: update Dockerfile for production build and add Chromium support

## 0.1.0

### Minor Changes

- 7051bde: feat: implement job scouting and filtering

  - Adds support for scouting jobs from various sources like Remotive and Naukri.
  - Implements a filtering mechanism to refine job results based on criteria such as category, location, date posted, and sorting order.
  - Introduces database schema and migrations to store job data.
  - Sets up scheduled tasks to periodically scout for new jobs.
  - Adds necessary API endpoints for health checks and filtering.
  - Includes utility functions for formatting time, managing promise pools, and handling query parameters.
  - Updates documentation to reflect the new features.
  - Improves project setup with Dockerfile, dockerignore, and environment variables.

### Patch Changes

- 84def07: fix(naukri): replace hardcoded bearer token with environment variable to avoid exposing sensitive information
- 0975ae9: chore: update project settings and dependencies

  - Updates project name and description.
  - Improves Docker scripts and configuration.
  - Adds and configures CI and CD workflows.
  - Introduces automated linting, formatting, and commit message validation.
