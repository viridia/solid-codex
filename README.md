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
* `.codex/components.tsx`, used to augment stories with additional context such as themes, global
  styles, solid-js context providers, and so on.
* `.codex/vite.config.{js|mjs|ts}`, permits customization of the Vite build, adding additional
  plugins, etc.

### `.codex/components.tsx`

* **Global decorator**: An exported component named `Decorator` will be used to wrap every story.
* **Head tags**: An exported component named `Head` will be inserted into the page head.

## TODO:

* event log / actions addon
* fswatcher to see when story index needs to be refreshed.
* string enums (and strings generally)
* number precision
* show story code (crash)
* Fix appearance of catalog (theme, cursor)
* highlight.js
* fix ssr
* addons
