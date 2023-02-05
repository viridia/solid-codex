import { StoryDecorator } from 'solid-codex/stories';

export const Decorator: StoryDecorator = props => {
  return <div>{props.children}</div>;
};
