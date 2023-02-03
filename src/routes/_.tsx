// @refresh reload
import { createResource, Show, Suspense } from 'solid-js';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Body, Head, Html, Meta, Scripts, Title } from 'solid-start';
import { useSearchParams } from '@solidjs/router';
import { rootCss } from '../components/styles.css';

export default function IframeApp() {
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
