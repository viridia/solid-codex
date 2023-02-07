/** @file CLI entry point. */
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import solid from 'solid-start/vite';
import { createServer, loadConfigFromFile, mergeConfig, searchForWorkspaceRoot, } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import process from 'process';
const __dirname = fileURLToPath(new URL('../..', import.meta.url));
const startDir = process.cwd();
const defaultStoryRoot = path.dirname(startDir);
const wsRoot = searchForWorkspaceRoot(startDir);
// Read configs and start the Vite server.
(async () => {
    const defines = {
        __STORY_PATTERNS__: JSON.stringify([path.join(defaultStoryRoot, '**/*.stories.tsx')]),
        __COMPONENTS__: JSON.stringify(null),
    };
    // Vite config for codex server.
    let viteConfig = {
        plugins: [
            vanillaExtractPlugin(),
            solid({
                routesDir: path.resolve(__dirname, 'src/routes'),
            }),
        ],
        configFile: false,
        root: __dirname,
        server: {
            port: 50005,
            fs: {
                allow: [wsRoot, __dirname],
            },
        },
        define: defines,
    };
    // TODO: Move this to a function.
    // Search for .codex directory
    for (let dir = startDir; dir; dir = path.dirname(dir)) {
        const codexDir = path.resolve(dir, '.codex');
        if (fs.existsSync(codexDir)) {
            const st = fs.statSync(codexDir);
            if (!st.isDirectory()) {
                console.error('.codex should be a directory.');
                process.exit(-1);
            }
            defines.__CODEX_DIR__ = JSON.stringify(codexDir);
            const configModule = await importIfExists(path.resolve(codexDir, 'config.mjs'));
            if (configModule) {
                // Process config.mjs file.
                const config = configModule.default;
                if (!config) {
                    console.error(`Config file config.mjs has no default export.`);
                    process.exit(-1);
                }
                if (config.stories) {
                    if (typeof config.stories === 'string') {
                        defines.__STORY_PATTERNS__ = JSON.stringify([
                            path.resolve(codexDir, '../', config.stories),
                        ]);
                    }
                    else if (Array.isArray(config.stories)) {
                        defines.__STORY_PATTERNS__ = JSON.stringify(config.stories.map(pattern => path.join(codexDir, '../', pattern)));
                    }
                }
                if (typeof config.port === 'number') {
                    viteConfig.server.port = config.port;
                }
            }
            // Process components.txt. No need to load here since it's only used in the iframe.
            const componentsPath = path.resolve(codexDir, 'components.tsx');
            if (fs.existsSync(componentsPath)) {
                defines.__COMPONENTS__ = JSON.stringify(componentsPath);
            }
            // Override user config.
            const userConfig = await loadConfigFromFile({
                command: 'serve',
                mode: 'dev',
            }, undefined, codexDir);
            if (userConfig) {
                // TODO: Remove props from user config that we can't handle - root, etc.
                viteConfig = mergeConfig(viteConfig, userConfig.config, true);
            }
            break;
        }
        // Stop searching if we get to workspace root.
        if (dir === wsRoot) {
            break;
        }
    }
    // process.chdir(__dirname);
    const server = await createServer(viteConfig);
    await server.listen();
    server.printUrls();
})();
async function importIfExists(filePath) {
    if (fs.existsSync(filePath)) {
        try {
            return (await import(filePath /* @vite-ignore */));
        }
        catch (e) {
            console.error(`Error importing ${filePath}`);
            process.exit(-1);
        }
    }
    return null;
}
