# How to Contribute

We would love to accept your patches and contributions to this project.

## Before you begin

### Sign our Contributor License Agreement

Contributions to this project must be accompanied by a
[Contributor License Agreement](https://cla.developers.google.com/about) (CLA).
You (or your employer) retain the copyright to your contribution; this simply
gives us permission to use and redistribute your contributions as part of the
project.

If you or your current employer have already signed the Google CLA (even if it
was for a different project), you probably don't need to do it again.

Visit <https://cla.developers.google.com/> to see your current agreements or to
sign a new one.

### Review our Community Guidelines

This project follows [Google's Open Source Community
Guidelines](https://opensource.google/conduct/).

## Contribution Process

### Code Reviews

All submissions, including submissions by project members, require review. We
use [GitHub pull requests](https://docs.github.com/articles/about-pull-requests)
for this purpose.

### Self Assigning Issues

If you're looking for an issue to work on, check out our list of issues that are labeled ["help wanted"](https://github.com/google-gemini/gemini-cli-workspace/issues?q=is%3Aissue+state%3Aopen+label%3A%22help+wanted%22).

To assign an issue to yourself, simply add a comment with the text `/assign`. The comment must contain only that text and nothing else. This command will assign the issue to you, provided it is not already assigned.

Please note that you can have a maximum of 3 issues assigned to you at any given time.

### Pull Request Guidelines

To help us review and merge your PRs quickly, please follow these guidelines. PRs that do not meet these standards may be closed.

#### 1. Link to an Existing Issue

All PRs should be linked to an existing issue in our tracker. This ensures that every change has been discussed and is aligned with the project's goals before any code is written.

- **For bug fixes:** The PR should be linked to the bug report issue.
- **For features:** The PR should be linked to the feature request or proposal issue that has been approved by a maintainer.

If an issue for your change doesn't exist, please **open one first** and wait for feedback before you start coding.

#### 2. Keep It Small and Focused

We favor small, atomic PRs that address a single issue or add a single, self-contained feature.

- **Do:** Create a PR that fixes one specific bug or adds one specific feature.
- **Don't:** Bundle multiple unrelated changes (e.g., a bug fix, a new feature, and a refactor) into a single PR.

Large changes should be broken down into a series of smaller, logical PRs that can be reviewed and merged independently.

#### 3. Use Draft PRs for Work in Progress

If you'd like to get early feedback on your work, please use GitHub's **Draft Pull Request** feature. This signals to the maintainers that the PR is not yet ready for a formal review but is open for discussion and initial feedback.

#### 4. Ensure All Checks Pass

Before submitting your PR, ensure that all automated checks are passing by running `npm run test && npm run lint`. This command runs all tests, linting, and other style checks.

#### 5. Write Clear Commit Messages and a Good PR Description

Your PR should have a clear, descriptive title and a detailed description of the changes. Follow the [Conventional Commits](https://www.conventionalcommits.org/) standard for your commit messages.

- **Good PR Title:** `feat(cli): Add --json flag to 'config get' command`
- **Bad PR Title:** `Made some changes`

In the PR description, explain the "why" behind your changes and link to the relevant issue (e.g., `Fixes #123`).

## Development Setup and Workflow

This section guides contributors on how to build, modify, and understand the development setup of this project.

### Setting Up the Development Environment

**Prerequisites:**

1.  **Node.js**:
    - **Development:** Please use Node.js `~20.19.0`. This specific version is required due to an upstream development dependency issue. You can use a tool like [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions.
    - **Production:** For running the CLI in a production environment, any version of Node.js `>=20` is acceptable.
2.  **Git**

### Build Process

To clone the repository:

```bash
git clone https://github.com/google-gemini/gemini-cli-workspace.git # Or your fork's URL
cd gemini-cli-workspace
```

To install dependencies defined in `package.json` as well as root dependencies:

```bash
npm install
```

To build the entire project (all packages):

```bash
npm run build
```

This command typically compiles TypeScript to JavaScript, bundles assets, and prepares the packages for execution. Refer to `scripts/build.js` and `package.json` scripts for more details on what happens during the build.

### Running Tests

This project contains unit tests.

#### Unit Tests

To execute the unit test suite for the project:

```bash
npm run test
```

This will run tests located in the `workspace-mcp-server/src/__tests__` directory. Ensure tests pass before submitting any changes. For a more comprehensive check, it is recommended to run `npm run test && npm run lint`.

### Linting and Style Checks

To ensure code quality and formatting consistency, run the linter and tests:

```bash
npm run test && npm run lint
```

This command will run ESLint, Prettier, all tests, and other checks as defined in the project's `package.json`.

_ProTip_

after cloning create a git precommit hook file to ensure your commits are always clean.

```bash
echo "
# Run npm build and check for errors
#!/bin/sh
# Run tests and linting before commit
if ! (npm run test && npm run lint); then
  echo "Pre-commit checks failed. Commit aborted."
  exit 1
fi
" > .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
```

#### Formatting

To separately format the code in this project by running the following command from the root directory:

```bash
npm run format
```

This command uses Prettier to format the code according to the project's style guidelines.

#### Linting

To separately lint the code in this project, run the following command from the root directory:

```bash
npm run lint
```

### Coding Conventions

- Please adhere to the coding style, patterns, and conventions used throughout the existing codebase.
- Consult [GEMINI.md](https://github.com/google-gemini/gemini-cli-workspace/blob/main/GEMINI.md) (typically found in the project root) for specific instructions related to AI-assisted development, including conventions for comments, and Git usage.
- **Imports:** Pay special attention to import paths. The project uses ESLint to enforce restrictions on relative imports between packages.

### Project Structure

- `workspace-mcp-server/`: The main workspace for the MCP server.
  - `src/`: Contains the source code for the server.
    - `__tests__/`: Contains all the tests.
    - `auth/`: Handles authentication.
    - `services/`: Contains the business logic for each service.
    - `utils/`: Contains utility functions.
  - `config/`: Contains configuration files.
- `scripts/`: Utility scripts for building, testing, and development tasks.