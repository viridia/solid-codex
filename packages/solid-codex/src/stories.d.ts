import { IStoryConfig } from "./data/stories";

declare module "*.stories.tsx" {
  const config: IStoryConfig;
  export default config;
}
