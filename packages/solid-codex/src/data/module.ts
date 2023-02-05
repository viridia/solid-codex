import { createResource } from 'solid-js';

/** Import a TypeScript module as a solid resource */
export const createImportedModule = (filePath: string) => {
  return createResource(async () => {
    return await import(filePath /* @vite-ignore */);
  });
};
