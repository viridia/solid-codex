import { Accessor } from 'solid-js';
import { Show, VoidComponent } from 'solid-js';
import { ICatalogTreeNode } from './tree';
import { canvasPaneCss, iframeCss } from './styles.css';
import { useCodex } from '../api';

const ResetCodex = () => {
  const codex = useCodex();

  codex.clearParams();
  codex.clearLogs();

  return null;
};

export const CanvasPane: VoidComponent<{
  node: Accessor<ICatalogTreeNode | undefined>;
}> = props => {
  return (
    <div classList={{ [canvasPaneCss]: true, 'dm-scrollbars': true }}>
      <Show when={props.node()?.story} keyed>
        {story => (
          <iframe
            class={iframeCss}
            src={`/_?${new URLSearchParams({
              file: story.filePath,
              name: story.propertyKey ?? '',
            }).toString()}`}
            height="100%"
          ></iframe>
        )}
      </Show>
    </div>
  );
};
