# Codex

**Codex** provides an environment for developing and testing UI components that are implemented
in Solid.js

## Quick Start

```sh
npm install --save-dev solid-codex
npx codex
```

## Writing stories

By default, Codex looks for files with the pattern `*.stories.tsx`. Story files should export
a Solid component for each story:

```tsx
export const ButtonStory = () => {
  return <button>Hello, world!</button>;
};
```

## Configuration

Codex will look for configuration files in the `.codex` directory of your project. This directory
can be located in the current directory or any parent directory up to the project workspace root.
Within this directory, there are a few different files you can create and use:

* `.codex/config.mjs`, used to specify things such as story search patterns or which addons are
   installed.

(Not done yet:)

* `.codex/root.tsx`, used to augment stories with additional context such as themes, global styles,
  solid-js context providers, and so on.

## TODO:

* event log
* root.tsx
* string enums (and strings generally)
* number precision
* highlight.js
* show story code
* fix ssr

## Addon structure

* package-name: solid-codex-<plugin_name>
* mentioned in config.mjs
* import default symbol.

structure:

```tsx
  import { action } 'solid-codex-eventlog/api'

  interface ICodexAddon {
    render(pluginContext): JSX.Element;
  }
```
