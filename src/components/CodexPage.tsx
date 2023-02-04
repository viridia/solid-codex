import { Page, Stack } from 'dolmen';
import { createMemo, Match, Show, Switch, VoidComponent } from 'solid-js';
import { useParams } from 'solid-start';
import { createCatalogTree } from '../data/catalogTree';
import type { IStory } from '../data/stories';
import { useUserSettings } from '../settings';
import { AdjustPane } from './AdjustPane';
import { AppHeader } from './AppHeader';
import { CatalogPane } from './CatalogPane';
import { SourcePane } from './SourcePane';
import { canvasPaneCss, canvasSectionStyle, iframeCss } from './styles.css';

export const CodexPage: VoidComponent<{ stories: IStory[] | undefined }> = props => {
  const [settings] = useUserSettings();
  const catalogTree = createCatalogTree(props.stories);
  const params = useParams();
  const selected = createMemo(() => {
    const id = params.id;
    if (id) {
      return catalogTree()?.byId[id] ?? null;
    }
  });

  return (
    <Page flexDirection="row">
      <CatalogPane tree={catalogTree()} />
      <AdjustPane />
      <Stack class={canvasSectionStyle} alignItems="stretch">
        <AppHeader selected={selected()} />
        <Switch>
          <Match when={settings.displayMode === 'canvas'}>
            <div classList={{ [canvasPaneCss]: true, 'dm-scrollbars': true }}>
              <Show when={selected()?.story} keyed>
                {story => (
                  <iframe
                    class={iframeCss}
                    src={`/_?${new URLSearchParams({
                      file: story.filePath,
                      name: story.propertyKey ?? '',
                    }).toString()}`}
                    height="100%"
                    title="preview"
                  ></iframe>
                )}
              </Show>
            </div>
          </Match>
          <Match when={settings.displayMode === 'source'}>
            <SourcePane node={selected}></SourcePane>
          </Match>
        </Switch>
      </Stack>
    </Page>
  );
};
