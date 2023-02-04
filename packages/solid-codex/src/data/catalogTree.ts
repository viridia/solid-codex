import { createMemo } from 'solid-js';
import { IStory } from './stories';

export interface ICatalogTreeNode {
  title: string;
  story?: IStory;
  children?: ICatalogTreeNode[];
  category: string[];
}

export interface ICatalogTree {
  children?: ICatalogTreeNode[];
  byId: Record<string, ICatalogTreeNode>;
}

export function createCatalogTree(storyList: IStory[] | undefined) {
  return createMemo<ICatalogTree>(() => {
    const root: ICatalogTreeNode[] = [];
    const byId: Record<string, ICatalogTreeNode> = {};
    const toSort: ICatalogTreeNode[][] = [root];
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

        const node: ICatalogTreeNode = {
          title: story.name,
          story: story,
          category: story.category,
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
}

function compareNodes(left: ICatalogTreeNode, right: ICatalogTreeNode) {
  return left.title.localeCompare(right.title);
}
