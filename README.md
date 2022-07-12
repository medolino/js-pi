# `@medolino/js-pi`

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/v/@medolino/js-pi.svg)](https://www.npmjs.com/package/@medolino/js-pi)

Personal CLI tool to initialize new JS projects.

## Install

Install globally using npm:

```bash
npm i -g @medolino/js-pi
```

## Usage

Run `js-pi` and answer a few questions about a new project:

```bash
js-pi
```
<p align="left">
  <img src="https://raw.githubusercontent.com/medolino/js-pi/master/doc/img/init-project-screen.png" alt="Cli usage example" width="687" height="auto" />
</p>

To skip questions, you can also provide options directly in CLI.

```bash
js-pi -t /path/to/project-directory -i true -g true
```

**Script options:**

```bash
  -t, --target      Target directory                          [string]  [default: "./"]
  -i, --install     Run npm install after project creation    [boolean] [default: true]
  -g, --git         Initialize git                            [boolean] [default: false]
```