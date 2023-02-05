import type { JSX } from 'solid-js';
import type { IStoryMsg } from './message';

// TODO: This is a sketch of the APIs, none of this is implemented.

/** Interface exported by an addon. */
export interface ICodexAddon {
  /** Name of this addon. */
  name: string;

  /** Render an element to be displayed in the adjustment panel. */
  render?(context: ICodexAddonContext): JSX.Element;
}

export interface ICodexAddonContext {
  /** Post a message to the iframe that contains the currently rendered story. */
  postMessage(message: IStoryMsg): void;
}
