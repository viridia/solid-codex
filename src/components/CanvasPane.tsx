import { createResource, createSignal, onMount, Show } from 'solid-js';
import { VoidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useCodex } from '../api-old';

const ResetCodex = () => {
  const codex = useCodex();

  codex.clearParams();
  codex.clearLogs();

  return null;
};

export const MountedCanvasPane: VoidComponent<{
  filePath: string;
  propertyKey: string;
}> = props => {
  const [component] = createResource(async () => {
    return (await import(props.filePath /* @vite-ignore */))[props.propertyKey!];
  });

  return <Dynamic component={component()} />;
};

export const CanvasPane: VoidComponent<{
  filePath: string;
  propertyKey: string;
}> = props => {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  return (
    <Show when={mounted()}>
      <MountedCanvasPane filePath={props.filePath} propertyKey={props.propertyKey} />
    </Show>
  );
};
