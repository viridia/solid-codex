import { createContext, useContext } from 'solid-js';

/** Context for defining fixture parameters. */
export interface ICodex {
  // /** Remove all parameter definitions from the store. */
  // clearParams(): void;

  // /** Reset all parameters to their default values. */
  // resetParams(): void;

  // /** Add a new parameter, and return an accessor of the value of that parameter. */
  // createParams<T extends { [key: string]: AnyParam }>(params: T): ParamAccessors<T>;

  // /** Return the keys of all defined parameters. */
  // // keys(): ReadonlyArray<string>;

  // /** Return the list of all parameter accessors. */
  // listParams(): ReadonlyArray<ParamAccessor<unknown>>;

  // /** Get the accessors for the given parameter. */
  // getParam(key: string): ParamAccessor<unknown>;

  // /** Append a message to the event log. */
  // log(message: string): void;

  // /** Creates a callback that prints to the log when invoked. */
  // action(message: string): () => void;

  // /** Return current log entries. */
  // logs(): string[];

  /** Clear saved log entries. */
  clearLogs(): void;
}

export const CodexContext = createContext<ICodex>();

export const useCodex = () => {
  const context = useContext(CodexContext);
  if (!context) {
    throw new Error('Missing Fixture Params Context');
  }
  return context;
};

export function createCodex(): ICodex {
  return {
    clearLogs() {
      //
    },
  };
}
