// @refresh reload
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Body, Head, Html, Meta, Scripts, Title } from 'solid-start';
import { useSearchParams } from '@solidjs/router';
import { rootCss } from '../components/styles.css';
import { CodexContext, createCodex } from '../api';
import { CanvasPane } from '../components/CanvasPane';

export default function IframeApp() {
  const codex = createCodex();
  const [params] = useSearchParams<{ file: string; name: string }>();

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
            <CanvasPane filePath={params.file} propertyKey={params.name} />
          </CodexContext.Provider>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
