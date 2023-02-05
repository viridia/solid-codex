import { ParamValues } from './params';

export interface IStoryMsg {
  type: string;
}

/** Command to display a story in the iframe. */
export interface ISelectStoryMsg extends IStoryMsg {
  type: 'story';
  filePath: string;
  propertyKey: string;
  params: ParamValues;
}

/** Command to update the parameters for the story. */
export interface IUpdateParamsMsg extends IStoryMsg {
  type: 'params';
  params: ParamValues;
}

export type StoryMessage = ISelectStoryMsg | IUpdateParamsMsg;
