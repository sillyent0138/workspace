# Gemini Workspace Extension

[![Build Status](https://github.com/google-gemini/gemini-cli-workspace/actions/workflows/ci.yml/badge.svg)](https://github.com/google-gemini/gemini-cli-workspace/actions/workflows/ci.yml)

Google Workspace MCP Server Extension.

This project is a Gemini extension that provides tools for interacting with Google Workspace services like Google Docs, Google Sheets, Google Slides, Google Calendar, Gmail, and Google Drive.

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Usage

To build the project, run the following command:

```bash
npm run build
```

To run the tests, run the following command:

```bash
npm run test
```

To start the server, run the following command:

```bash
npm start
```

## Important security consideration: Indirect Prompt Injection Risk

When exposing any language model to untrusted data, there's a risk of an [indirect prompt injection attack](https://en.wikipedia.org/wiki/Prompt_injection). Agentic tools like Gemini CLI, connected to MCP servers, have access to a wide array of tools and APIs.

This MCP server grants the agent the ability to read, modify, and delete your Google Account data, as well as other data shared with you.

* Never use this with untrusted tools
* Never include untrusted inputs into the model context. This includes asking Gemini CLI to process mail, documents, or other resources from unverified sources.
* Untrusted inputs may contain hidden instructions that could hijack your CLI session. Attackers can then leverage this to modify, steal, or destroy your data.
* Always carefully review actions taken by Gemini CLI on your behalf to ensure they are correct and align with your intentions.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to contribute to this project.

## 📄 Legal

- **License**: [Apache License 2.0](LICENSE)
- **Terms of Service**: [Terms of Service](https://policies.google.com/terms)
- **Privacy Policy**: [Privacy Policy](https://policies.google.com/privacy)
- **Security**: [Security Policy](SECURITY.md)
