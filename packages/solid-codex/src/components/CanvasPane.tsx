import { createResource, createSignal, onMount, Show } from 'solid-js';
import { VoidComponent } from 'solid-js';
import { Store } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import { ParamValues } from '../data/params';
import { StoryFunction } from '../data/stories';

export const MountedCanvasPane: VoidComponent<{
  filePath: string;
  propertyKey: string;
  params: Store<ParamValues>;
}> = props => {
  const [component] = createResource<StoryFunction>(async () => {
    return (await import(props.filePath /* @vite-ignore */))[props.propertyKey!];
  });

  return <Dynamic component={component()} {...props.params} />;
};

export const CanvasPane: VoidComponent<{
  filePath: string;
  propertyKey: string;
  params: Store<ParamValues>;
}> = props => {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  return (
    <Show when={mounted()}>
      <MountedCanvasPane
        filePath={props.filePath}
        propertyKey={props.propertyKey}
        params={props.params}
      />
    </Show>
  );
};
