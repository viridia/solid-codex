import { Page, Stack } from 'dolmen';
import { createEffect, createMemo, createSignal, Match, Switch, VoidComponent } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useParams } from 'solid-start';
import { createCatalogTree } from '../data/catalogTree';
import { ISelectStoryMsg, IUpdateParamsMsg } from '../data/message';
import { getDefaultParamValues, ParamsContext, ParamValues } from '../data/params';
import type { IStory } from '../data/stories';
import { useUserSettings } from '../settings';
import { AdjustPane } from './AdjustPane';
import { AppHeader } from './AppHeader';
import { CatalogPane } from './CatalogPane';
import { SourcePane } from './SourcePane';
import { canvasPaneCss, canvasSectionStyle, iframeCss } from './styles.css';

export const CodexPage: VoidComponent<{ stories: IStory[] | undefined }> = props => {
  const [frame, setFrame] = createSignal<HTMLIFrameElement>();
  const [storyParams, setStoryParams] = createStore<ParamValues>({});
  const [settings] = useUserSettings();
  const catalogTree = createCatalogTree(props.stories);
  const params = useParams();
  const selected = createMemo(() => {
    const id = params.id;
    if (id) {
      return catalogTree()?.byId[id] ?? null;
    }
  });

  // Send a story init message when selected story changes.
  createEffect(() => {
    const frameElt = frame();
    const selectedStory = selected();
    if (frameElt && selectedStory && selectedStory.story) {
      const message: ISelectStoryMsg = {
        type: 'story',
        filePath: selectedStory.story.filePath,
        propertyKey: selectedStory.story.propertyKey,
        params: getDefaultParamValues(selectedStory.story.params),
      };
      frameElt.contentWindow?.postMessage(message);
      setStoryParams(message.params);
    }
  });

  // Send a params update when story params change.
  createEffect(() => {
    const frameElt = frame();
    if (frameElt) {
      const message: IUpdateParamsMsg = {
        type: 'params',
        params: { ...storyParams },
      };
      frameElt.contentWindow?.postMessage(message);
    }
  });

  return (
    <ParamsContext.Provider
      value={{
        values: storyParams,
        setValues: setStoryParams,
      }}
    >
      <Page flexDirection="row">
        <CatalogPane tree={catalogTree()} />
        <AdjustPane story={selected()?.story} />
        <Stack class={canvasSectionStyle} alignItems="stretch">
          <AppHeader selected={selected()} />
          <Switch>
            <Match when={settings.displayMode === 'canvas'}>
              <div classList={{ [canvasPaneCss]: true, 'dm-scrollbars': true }}>
                <iframe class={iframeCss} ref={setFrame} src="/_" height="100%" title="preview" />
              </div>
            </Match>
            <Match when={settings.displayMode === 'source'}>
              <SourcePane node={selected}></SourcePane>
            </Match>
          </Switch>
        </Stack>
      </Page>
    </ParamsContext.Provider>
  );
};
