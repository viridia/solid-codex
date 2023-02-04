import { createContext } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';

export interface IParam {
  caption?: string;
}

/** Defines a boolean parameter. */
export interface IBooleanParam extends IParam {
  kind: 'boolean';
  default?: boolean;
}

/** Defines a string typed parameter. */
export interface IStringParam extends IParam {
  kind: 'string';
  default?: string;
  enumVals?: string[];
}

/** Defines a number-typed parameter. */
export interface INumberParam extends IParam {
  kind: 'number';
  default?: number;
  min?: number;
  max?: number;
  precision?: number;
}

/** Union of parameter definition types. */
export type ParamDefn = IBooleanParam | IStringParam | INumberParam;

/** Container of parameter definitions. */
export type ParamDefnMap = Record<string, ParamDefn>;

/** Container of parameter values. */
export type ParamValues = Record<string, unknown>;

export function getDefaultValue(param: ParamDefn) {
  switch (param.kind) {
    case 'boolean':
      return param.default ?? false;
    case 'string':
      return param.default ?? param.enumVals?.[0] ?? '';
    case 'number':
      return param.default ?? param.min ?? 0;
  }
}

/** Given a set of parameter definitions, return an object containing the default values. */
export function getDefaultParamValues(params?: ParamDefnMap) {
  const result: ParamValues = {};
  if (params) {
    Object.entries(params).forEach(([paramId, param]) => {
      result[paramId] = getDefaultValue(param);
    });
  }

  return result;
}

export interface IParamsContext {
  values: ParamValues;
  setValues: SetStoreFunction<ParamValues>;
}

export const ParamsContext = createContext<IParamsContext>();
