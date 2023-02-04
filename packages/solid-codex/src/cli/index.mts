import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import solid from 'solid-start/vite';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import { cwd } from 'process';
import path from 'path';

const __dirname = fileURLToPath(new URL('../..', import.meta.url));
const storyRoots = [path.dirname(cwd())];

(async () => {
  const server = await createServer({
    plugins: [vanillaExtractPlugin(), solid()],
    configFile: false,
    root: __dirname,
    server: {
      port: 50005,
    },
    define: {
      __STORY_ROOTS__: JSON.stringify(storyRoots),
      __STORY_PATTERN__: JSON.stringify('**/*.stories.tsx'),
    },
  });
  await server.listen();

  server.printUrls();
})();
