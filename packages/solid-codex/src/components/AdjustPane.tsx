import { Drawer, Header, ScrollArea, CodeBlock } from 'dolmen';
import { createEffect, createSignal, Show, VoidComponent } from 'solid-js';
import { unstable_clientOnly } from 'solid-start';
import { IStory } from '../data/stories';
import { useUserSettings } from '../settings';
import {
  adjustPaneStyle,
  adjustPaneParamsSection,
  adjustPaneLogSection,
  adjustPaneEventLog,
} from './styles.css';

const ParamsEditorClient = unstable_clientOnly(() => import('./ParamsEditor'));

export const AdjustPane: VoidComponent<{
  story: IStory | undefined;
}> = props => {
  const [settings] = useUserSettings();
  const [isClient, setIsClient] = createSignal(false);

  createEffect(() => {
    setIsClient(true);
  });

  return (
    <Drawer
      side="start"
      classList={{ 'dm-theme-dark': true, [adjustPaneStyle]: true }}
      open={settings.showAdjust}
      size="300px"
    >
      <Show when={isClient()}>
        <Drawer.Header>
          <Header>Adjust Parameters</Header>
        </Drawer.Header>
        <Drawer.Content class={adjustPaneParamsSection}>
          <Show when={props.story?.params} keyed>
            {params => <ParamsEditorClient params={params}

            />}
          </Show>
        </Drawer.Content>
        <Drawer.Content class={adjustPaneLogSection}>
          <Header>Event Log</Header>
          <ScrollArea class={adjustPaneEventLog}>
            {/* <CodeBlock size="xs">{codex.logs().join('\n')}</CodeBlock> */}
          </ScrollArea>
        </Drawer.Content>
      </Show>
    </Drawer>
  );
};
