import type { IStoryConfig } from './src/data/stories';
export { StoryFunction, StoryDecorator } from './src/data/stories';

declare module '*.stories.tsx' {
  const config: IStoryConfig;
  export default config;
}