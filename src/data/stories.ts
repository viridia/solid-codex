import { globby } from 'globby';
import path from 'path';
import { JSX } from 'solid-js';

declare global {
  const __STORY_ROOTS__: string[];
  const __STORY_PATTERN__: string;
}

export interface IStory {
  /** Display name of the story */
  name: string;

  /** Filesystem path to source module containing the story. */
  filePath: string;

  /** id displayed in url. */
  urlPath: string;

  /** For modules containing multiple fixtures, the name of the property used to get it. */
  propertyKey?: string;

  /** Hierarchical category shown in tree view. */
  category: string[];

  // TODO: Checksum
}

export interface IStoryConfig {
  category?: string;
}

type StoryModule = { default: IStoryConfig } & Record<string, () => unknown>;
type StoryFunction = (() => JSX.Element) & { storyName?: string };

// const [stories, setStories] = createStore<Record<string, string>>();

export const storyIndex = async () => {
  // console.log(__STORY_ROOTS__, __STORY_PATTERN__);
  const patterns = __STORY_ROOTS__.map(root => path.join(root, __STORY_PATTERN__));
  // console.log('patterns', patterns);
  const storyFiles = await globby(patterns, {
    expandDirectories: true,
    ignore: ['**/node_modules/**'],
  });
  // console.log('stories', storyFiles);
  const stories: IStory[] = [];
  for (const filePath of storyFiles) {
    const module = (await import(filePath /* @vite-ignore */)) as StoryModule;
    const categoryName = path.basename(filePath).split('.')[0];
    let category = [categoryName];
    if (typeof module.default === 'object') {
      const categoryString = module.default.category;
      if (typeof categoryString === 'string' && categoryString.length > 0) {
        category = categoryString.split(/\s*\/\s*/);
      }
    }
    for (const key in module) {
      const entry = module[key] as StoryFunction;
      if (typeof key === 'string' && key !== 'default' && typeof entry === 'function') {
        let name = key;
        if (typeof entry.storyName === 'string') {
          name = entry.storyName;
        } else if (name.endsWith('Story')) {
          name = name.slice(0, -5);
        }
        stories.push({
          name,
          filePath,
          urlPath: getUniquePath(category.join('-')),
          propertyKey: key,
          category,
        });
      }
    }
  }
  return stories;
};

const uniquePaths = new Set<string>();
const getUniquePath = (...names: string[]) => {
  const stem = names.join('-').toLowerCase().replaceAll(' ', '-');
  let result = stem;
  let index = 0;
  while (uniquePaths.has(result)) {
    result = `${stem}${++index}`;
  }
  return result;
};
