# unwork-scout

## 0.1.3

### Patch Changes

- bdd623d: chore: update deployment script and package dependencies
- 3a9e39f: refactor: moved chromium from docker image to browserless image

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
