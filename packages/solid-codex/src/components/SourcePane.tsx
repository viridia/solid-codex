import { Accessor, createResource, Suspense } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { sourcePaneStyle } from './styles.css';
import { CodeBlock } from 'dolmen';
import { isServer } from 'solid-js/web';
import { IStory } from '../data/stories';
import { ICatalogTreeNode } from '../data/catalogTree';

const srcPrologue = 'export default "';
const srcEpilogue = '";\n//# sourceMappingURL';

function SourceDisplay(props: { fixture: IStory }) {
  const [source] = createResource(props.fixture, async fixture => {
    const { filePath } = fixture;
    const resp = await fetch(`${filePath}?raw`);
    const text = await resp.text();
    let startIndex = 0;
    if (text.startsWith(srcPrologue)) {
      startIndex = srcPrologue.length;
    }
    let endIndex = text.indexOf(srcEpilogue);
    if (endIndex < 0) {
      endIndex = text.length;
    }
    return JSON.parse(`"${text.slice(startIndex, endIndex)}"`);
  });

  let ref: HTMLDivElement;

  return (
    !isServer && (
      <Suspense>
        <CodeBlock block class="language-tsx" ref={ref!}>
          {source()}
        </CodeBlock>
      </Suspense>
    )
  );
}

export const SourcePane: VoidComponent<{
  node: Accessor<ICatalogTreeNode | undefined>;
}> = props => {
  return (
    <div class={sourcePaneStyle}>
      <Show when={props.node()?.story} keyed>
        {fix => <SourceDisplay fixture={fix} />}
      </Show>
    </div>
  );
};
