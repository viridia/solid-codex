// @refresh reload
import { createResource, Show, Suspense } from 'solid-js';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Body, Head, Html, Meta, Scripts, Title } from 'solid-start';
import styles from 'dolmen/css/styles.css?raw';
import lightTheme from 'dolmen/css/theme/light.css?raw';
import darkTheme from 'dolmen/css/theme/dark.css?raw';
import { rootCss } from './styles.css';
import { useSearchParams } from '@solidjs/router';

export function IframeApp() {
  const [params] = useSearchParams<{ file: string; name: string }>();
  const [component] = createResource(async () => {
    if (params.file) {
      const mod = await import(params.file);
      if (mod) {
        return mod[params.name];
      }
    }
    return null;
  });

  return (
    <Html lang="en" class={rootCss}>
      <Head>
        <Meta charset="utf-8" />
        <Title>Codex</Title>
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <style innerHTML={styles} />
        <style innerHTML={lightTheme} />
        <style innerHTML={darkTheme} />
      </Head>
      <Body>
        <ErrorBoundary>
          <Suspense>
            <Show when={component()} keyed>
              {C => <C />}
            </Show>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
