import { createMemo, createSignal, onMount, ParentComponent, Show } from 'solid-js';
import { VoidComponent } from 'solid-js';
import { Store } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import { createImportedModule } from '../data/module';
import { ParamValues } from '../data/params';
import { StoryDecorator, StoryFunction } from '../data/stories';

export const DecoratedStory: ParentComponent<{
  filePath: string;
  propertyKey: string;
}> = props => {
  const [componentModule] = createImportedModule(props.filePath);
  const component = createMemo<StoryDecorator>(() => {
    return componentModule()?.[props.propertyKey];
  });

  return <Dynamic component={component()} children={props.children} />;
};

export const RenderedStory: VoidComponent<{
  filePath: string;
  propertyKey: string;
  params: Store<ParamValues>;
}> = props => {
  const [storyModule] = createImportedModule(props.filePath);
  const component = createMemo<StoryFunction>(() => {
    return storyModule()?.[props.propertyKey];
  });

  if (__COMPONENTS__) {
    const [globalModule] = createImportedModule(__COMPONENTS__);
    const decorator = createMemo<StoryDecorator>(() => {
      return globalModule()?.Decorator;
    });
    return (
      // TODO: Decorator params
      <Dynamic component={decorator()}>
        <Dynamic component={component()} {...props.params} />
      </Dynamic>
    );
  }

  return <Dynamic component={component()} {...props.params} />;
};

export const CanvasPane: VoidComponent<{
  filePath: string;
  propertyKey: string;
  params: Store<ParamValues>;
}> = props => {
  // TODO: This is necessary because iframe+SSR doesn't currently work. However, it would
  // be good to figure out a workaround so that SSR components can be fully tested.
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  return (
    <Show when={mounted()}>
      <RenderedStory
        filePath={props.filePath}
        propertyKey={props.propertyKey}
        params={props.params}
      />
    </Show>
  );
};
