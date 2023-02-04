// @refresh reload
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Body, Head, Html, Meta, Scripts, Title } from 'solid-start';
import { rootCss } from '../components/styles.css';
import { CodexContext, createCodex } from '../api';
import { CanvasPane } from '../components/CanvasPane';
import { batch, createEffect, createSignal, onCleanup, Show } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';
import { StoryMessage } from '../data/message';

export default function IframeApp() {
  const codex = createCodex();
  const [story, setStory] = createSignal<{ filePath: string; propertyKey: string } | null>(null);
  const [params, setParams] = createStore<Record<string, unknown>>({});
  createEffect(() => {
    const handler = (e: MessageEvent<StoryMessage>) => {
      const msg = e.data;
      switch (msg.type) {
        case 'story': {
          batch(() => {
            setStory({
              filePath: msg.filePath,
              propertyKey: msg.propertyKey,
            });
            // Replace entire store with new param values.
            setParams(reconcile(msg.params ?? {}));
          });
          break;
        }

        case 'params': {
          // Mutate in place
          setParams(msg.params);
          break;
        }
      }
    };
    window.addEventListener('message', handler);
    onCleanup(() => window.removeEventListener('message', handler));
  });

  return (
    <Html lang="en" class={rootCss}>
      <Head>
        <Meta charset="utf-8" />
        <Title>Codex</Title>
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <ErrorBoundary>
          <CodexContext.Provider value={codex}>
            <Show when={story()} keyed>
              {story => (
                <CanvasPane
                  filePath={story.filePath}
                  propertyKey={story.propertyKey}
                  params={params}
                />
              )}
            </Show>
          </CodexContext.Provider>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
