import type { IStoryConfig } from './src/data/stories';
export type { IStoryConfig } from './src/data/stories';
export { StoryComponent, StoryDecorator } from './src/data/stories';

declare module '*.stories.tsx' {
  const config: IStoryConfig;
  export default config;
}
