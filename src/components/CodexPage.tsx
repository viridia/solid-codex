import { Page, Stack } from 'dolmen';
import { createMemo, lazy, Match, Switch, VoidComponent } from 'solid-js';
import { useParams } from 'solid-start';
import type { IStory } from '../data/stories';
import { useUserSettings } from '../settings';
import { AdjustPane } from './AdjustPane';
import { AppHeader } from './AppHeader';
import { CanvasPane } from './CanvasPane';
import { CatalogPane } from './CatalogPane';
import { SourcePane } from './SourcePane';
import { canvasSectionStyle } from './styles.css';
import type { ICatalogTree, ICatalogTreeNode } from './tree';

export const CodexPage: VoidComponent<{ stories: IStory[] | undefined }> = props => {
  const [settings] = useUserSettings();

  const catalogTree = createMemo<ICatalogTree>(() => {
    const root: ICatalogTreeNode[] = [];
    const byId: Record<string, ICatalogTreeNode> = {};
    const toSort: ICatalogTreeNode[][] = [root];
    const storyList = props.stories;
    if (storyList) {
      // Build tree nodes by coalescing category names
      for (const story of storyList) {
        let parent = root;
        const dirCategory: string[] = [];
        for (const dirName of story.category) {
          dirCategory.push(dirName);
          let next = parent.find(f => f.title === dirName);
          if (!next) {
            next = {
              title: dirName,
              category: [...dirCategory],
              children: [],
            };
            parent.push(next);
            toSort.push(next.children!);
          }
          parent = next.children!;
        }

        const component = lazy(async () => {
          let component = (await import(story.filePath /* @vite-ignore */)).default;
          if (!component) {
            console.error(`No default export: ${story.filePath}`);
            return { default: null };
          }
          if (story.propertyKey) {
            component = component[story.propertyKey];
          }
          return {
            default: typeof component === 'function' ? component : null,
          };
        });

        const node: ICatalogTreeNode = {
          title: story.name,
          story: story,
          category: story.category,
          component,
        };
        parent.push(node);
        byId[story.urlPath] = node;
      }

      // Sort nodes
      for (const dir of toSort) {
        dir.sort(compareNodes);
      }
    }

    return {
      children: root,
      byId,
    };
  });

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
            <CanvasPane node={selected}></CanvasPane>
          </Match>
          <Match when={settings.displayMode === 'source'}>
            <SourcePane node={selected}></SourcePane>
          </Match>
        </Switch>
      </Stack>
    </Page>
  );
};

function compareNodes(left: ICatalogTreeNode, right: ICatalogTreeNode) {
  return left.title.localeCompare(right.title);
}
