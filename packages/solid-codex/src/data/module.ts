import { createResource } from 'solid-js';
import { StoryDecorator, StoryFunction } from './stories';

/** Import a TypeScript module as a solid resource */
export const createImportedModule = (filePath: string | null) => {
  return createResource<Record<string, StoryFunction | StoryDecorator>>(async () => {
    if (!filePath) {
      return null;
    }
    return await import(filePath /* @vite-ignore */);
  });
};
