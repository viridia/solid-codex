import { createContext, createEffect, createSignal, onCleanup, useContext } from 'solid-js';

interface ICodexState {
  store?: null;
}

interface ICodexStateResult {
  frameProps: { ref: (elt: HTMLIFrameElement) => void };
  state: ICodexState
}

export const createAddonRegistry = (): ICodexStateResult => {
  const [element, setElement] = createSignal<HTMLIFrameElement>();

  createEffect(() => {
    const handler = (ev: MessageEvent) => {
      console.log('message event:', ev);
    };
    window.addEventListener('message', handler);
    onCleanup(() => window.removeEventListener('message', handler));
  });

  return {
    frameProps: {
      ref: setElement,
    },

    state: {

    }
  };
};

export const PluginContext = createContext<ICodexState>();

export const useCodexState = () => {
  const context = useContext(PluginContext);
  if (!context) {
    throw new Error('Missing Codex State Context');
  }
  return context;
};
