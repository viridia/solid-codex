import { Component, createContext } from 'solid-js';
import { createLocalStorageStore } from '../data/createLocalStorageStore';
import { IStory } from '../data/stories';
// import { createLocalStorageStore } from '../data/createLocalStorageStore';

export interface ICatalogTreeNode {
  title: string;
  story?: IStory;
  children?: ICatalogTreeNode[];
  component?: Component;
  category: string[];
}

export interface ICatalogTree {
  children?: ICatalogTreeNode[];
  byId: Record<string, ICatalogTreeNode>;
}

export interface ITreeExpansionState {
  isExpanded(key: string): boolean | undefined;
  setExpanded(key: string, expanded: boolean): void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createExpansionStateStore(storageKey: string): ITreeExpansionState {
  const [store, setStore] = createLocalStorageStore<Record<string, boolean>>(storageKey, {});

  // const [store, setStore] = createStore<Record<string, boolean>>({});

  return {
    isExpanded(key: string): boolean | undefined {
      return store[key];
    },

    setExpanded(key: string, expanded: boolean) {
      return setStore(key, expanded);
    },
  };
}

export const TreeExpansionContext = createContext<ITreeExpansionState>();
