import { createContext } from 'solid-js';
import { createLocalStorageStore } from './createLocalStorageStore';

export interface IExpansionState {
  isExpanded(key: string): boolean | undefined;
  setExpanded(key: string, expanded: boolean): void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createExpansionStateStore(storageKey: string): IExpansionState {
  const [store, setStore] = createLocalStorageStore<Record<string, boolean>>(storageKey, {});

  return {
    isExpanded(key: string): boolean | undefined {
      return store[key];
    },

    setExpanded(key: string, expanded: boolean) {
      return setStore(key, expanded);
    },
  };
}

export const ExpansionContext = createContext<IExpansionState>();
