import { Accessor, createResource, Suspense } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { sourcePaneStyle } from './styles.css';
import { CodeBlock } from 'dolmen';
import { IStory } from '../data/stories';
import { ICatalogTreeNode } from '../data/catalogTree';
import ErrorBoundary from 'solid-start';
import server$ from 'solid-start/server';
import { readFile } from 'fs/promises';

function SourceDisplay(props: { story: IStory }) {
  // Note: this can read any file in the project directory, so it's not the most secure.
  const fetchSource = server$((path: string) => {
    return readFile(path).then(file => file.toString());
  });

  const [src] = createResource(async () => {
    const { filePath } = props.story;
    const source = await fetchSource(filePath);
    return source || '';
  });

  return (
    <ErrorBoundary>
      <Suspense>
        <CodeBlock block class="language-tsx">
          {src()}
        </CodeBlock>
      </Suspense>
    </ErrorBoundary>
  );
}

export const SourcePane: VoidComponent<{
  node: Accessor<ICatalogTreeNode | undefined>;
}> = props => {
  return (
    <div class={sourcePaneStyle}>
      <Show when={props.node()?.story} keyed>
        {fix => <SourceDisplay story={fix} />}
      </Show>
    </div>
  );
};
