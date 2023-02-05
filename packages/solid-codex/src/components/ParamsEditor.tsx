import { Text, CheckBox, Slider, Group } from 'dolmen';
import { For, Match, Switch, useContext, VoidComponent } from 'solid-js';
import {
  ParamDefnMap,
  ParamDefn,
  IBooleanParam,
  INumberParam,
  ParamsContext,
} from '../data/params';
import { paramGroupCss, paramSliderCss, paramSliderValue } from './styles.css';

const BooleanParamControl: VoidComponent<{ name: string; param: IBooleanParam }> = props => {
  const params = useContext(ParamsContext)!;
  return (
    <div class={paramGroupCss}>
      <CheckBox
        checked={params.values[props.name] as boolean}
        onChange={e => {
          params.setValues(props.name, e.currentTarget.checked);
        }}
      >
        {props.param.caption ?? props.name}
      </CheckBox>
    </div>
  );
};

const NumberParamControl: VoidComponent<{ name: string; param: INumberParam }> = props => {
  const params = useContext(ParamsContext)!;
  return (
    <div class={paramGroupCss}>
      <div>{props.param.caption ?? props.name}</div>
      <Group gap="xl">
        <Slider
          class={paramSliderCss}
          value={params.values[props.name] as number}
          min={props.param.min ?? 0}
          max={props.param.max ?? 100}
          step={1}
          valueLabelDisplay="auto"
          onChange={newValue => {
            params.setValues(props.name, newValue);
          }}
        />
        <div class={paramSliderValue}>{params.values[props.name] as number}</div>
      </Group>
    </div>
  );
};

// TODO: strings and string enums.
const ParamControl: VoidComponent<{ name: string; param: ParamDefn }> = props => {
  return (
    <Switch>
      <Match when={props.param.kind === 'boolean'}>
        <BooleanParamControl name={props.name} param={props.param as IBooleanParam} />
      </Match>
      <Match when={props.param.kind === 'number'}>
        <NumberParamControl name={props.name} param={props.param as INumberParam} />
      </Match>
    </Switch>
  );
};

const ParamsEditor: VoidComponent<{
  params: ParamDefnMap;
}> = props => {
  return (
    <For
      each={Object.entries(props.params)}
      fallback={
        <Text dim em>
          No Parameters
        </Text>
      }
    >
      {([name, defn]) => <ParamControl name={name} param={defn} />}
    </For>
  );
};

export default ParamsEditor;
