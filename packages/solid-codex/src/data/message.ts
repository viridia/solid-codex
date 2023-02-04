import { ParamValues } from './params';

/** Command to display a story in the iframe. */
export interface ISelectStoryMsg {
  type: 'story';
  filePath: string;
  propertyKey: string;
  params: ParamValues;
}

/** Command to update the parameters for the story. */
export interface IUpdateParamsMsg {
  type: 'params';
  params: ParamValues;
}

export type StoryMessage = ISelectStoryMsg | IUpdateParamsMsg;
