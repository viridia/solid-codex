import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import solid from 'solid-start/vite';
import { createServer, searchForWorkspaceRoot } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = fileURLToPath(new URL('../..', import.meta.url));
const startDir = process.cwd();
const defaultStoryRoot = path.dirname(process.cwd());
const wsRoot = searchForWorkspaceRoot(startDir);

interface ICodexConfig {
  stories?: string | string[];
}

(async () => {
  const defines: Record<string, string> = {
    __STORY_PATTERNS__: JSON.stringify([path.join(defaultStoryRoot, '**/*.stories.tsx')]),
  };

  // Search for .codex directory
  for (let dir = startDir; dir; dir = path.dirname(dir)) {
    const codexDir = path.resolve(dir, '.codex');
    if (fs.existsSync(codexDir)) {
      const st = fs.statSync(codexDir);
      if (st.isDirectory()) {
        defines.__CODEX_DIR__ = JSON.stringify(codexDir);
        const configPath = path.resolve(codexDir, 'config.mjs');
        if (fs.existsSync(configPath)) {
          try {
            // Process config.mjs file.
            const configModule = await import(configPath);
            const config = configModule?.default as ICodexConfig;
            if (!config) {
              console.error(`Config file config.mjs has no default export.`);
            } else if (config.stories) {
              if (typeof config.stories === 'string') {
                defines.__STORY_PATTERNS__ = JSON.stringify([
                  path.resolve(codexDir, '../', config.stories),
                ]);
              } else if (Array.isArray(config.stories)) {
                defines.__STORY_PATTERNS__ = JSON.stringify(
                  config.stories.map(pattern => path.join(codexDir, '../', pattern))
                );
              }
            }
          } catch (e) {
            console.error(`Error reading config.mjs`);
          }
        }
        // const componentPath = path.resolve(codexDir, 'components.tsx');
      } else {
        console.error('.codex should be a directory.');
      }
    }
    if (dir === wsRoot) {
      break;
    }
  }

  process.chdir(__dirname);

  const server = await createServer({
    plugins: [vanillaExtractPlugin(), solid({})],
    configFile: false,
    root: __dirname,
    server: {
      port: 50005,
      fs: {
        allow: [wsRoot],
      },
    },
    define: defines,
  });
  await server.listen();

  server.printUrls();
})();
