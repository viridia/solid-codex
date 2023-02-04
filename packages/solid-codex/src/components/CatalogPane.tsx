import { Aside, DiscloseButton, EmptyResult } from 'dolmen';
import { createSignal, For, Match, onMount, Show, Switch, useContext } from 'solid-js';
import { VoidComponent } from 'solid-js';
import {
  catalogEntryStyle,
  catalogGroup,
  catalogEntryName,
  selectableEntryName,
  catalogPaneCss,
  discloseAreaCss,
} from './styles.css';
import { createExpansionStateStore, ExpansionContext } from '../data/expansion';
import { useNavigate, useParams } from '@solidjs/router';
import { ICatalogTree, ICatalogTreeNode } from '../data/catalogTree';

interface ItemProps {
  node: ICatalogTreeNode;
}

const CatalogItem: VoidComponent<ItemProps> = props => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const expansion = useContext(ExpansionContext)!;

  const expansionId = `${props.node.category.join('-')}`.toLowerCase().replace(' ', '-');
  const isExpanded = () =>
    Boolean((props.node.children && expansion.isExpanded(expansionId)) ?? false);
  // console.log(expansionId, isExpanded());
  return (
    <li classList={{ [catalogEntryStyle]: true }}>
      <div
        classList={{
          [catalogEntryName]: true,
          [selectableEntryName]: !!props.node.story,
          selected: props.node.story && params.id === props.node.story.urlPath,
        }}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          if (props.node.story) {
            navigate(`/story/${props.node.story.urlPath}`);
          } else if (props.node.children) {
            expansion.setExpanded(expansionId, !isExpanded());
          }
        }}
      >
        <div classList={{ [discloseAreaCss]: true, 'dm-scrollbars': true }}>
          <Show when={props.node.children} keyed>
            <DiscloseButton open={isExpanded()} />
          </Show>
        </div>
        {props.node.title}
      </div>
      <Show when={props.node.children} keyed>
        {children => <CatalogGroup nodes={children} expanded={isExpanded()} />}
      </Show>
    </li>
  );
};

interface GroupProps {
  nodes: ICatalogTreeNode[];
  root?: boolean;
  expanded?: boolean;
}

const CatalogGroup: VoidComponent<GroupProps> = props => {
  return (
    <ul
      classList={{
        [catalogGroup]: true,
        root: props.root,
        expanded: props.expanded,
      }}
    >
      <For each={props.nodes}>{fix => <CatalogItem node={fix} />}</For>
    </ul>
  );
};

interface CatalogProps {
  tree: ICatalogTree;
  root?: boolean;
}

export const CatalogPane: VoidComponent<CatalogProps> = props => {
  const expansion = createExpansionStateStore('catalog-view');
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  return (
    <Aside classList={{ 'dm-theme-dark': true, [catalogPaneCss]: true }}>
      <Switch>
        <Match when={props.tree.children?.length === 0}>
          <EmptyResult>No stories found</EmptyResult>
        </Match>
        <Match when={mounted()}>
          <ExpansionContext.Provider value={expansion}>
            <CatalogGroup root nodes={props.tree.children ?? []} />
          </ExpansionContext.Provider>
        </Match>
      </Switch>
    </Aside>
  );
};
