import { StoryFunction } from 'solid-codex/stories';
import { createSignal, onCleanup, VoidComponent } from 'solid-js';
// import { useCodex } from '../src/api';

const [count, setCount] = createSignal(0);

const Counter: VoidComponent<{ value: number }> = props => {
  // const codex = useCodex();
  // console.log('codex', codex);
  return (
    <div>
      <button
        onClick={() => {
          setCount(count => count + 1);
        }}
      >
        add
      </button>
      <div>Count: {count()}</div>
      <div>value: {props.value}</div>
    </div>
  );
};

export const CounterStory: StoryFunction<{ value: number }> = props => (
  <Counter value={props?.value} />
);
CounterStory.storyName = 'Counter';
CounterStory.params = {
  value: {
    kind: 'number',
    min: 0,
    max: 20,
    precision: 0,
    default: 19,
  },
};

const CountingComponent = () => {
  const [count, setCount] = createSignal(0);
  const interval = setInterval(() => setCount(c => c + 1), 1000);
  onCleanup(() => clearInterval(interval));
  return <div>Count value is {count()}</div>;
};
export const CountingStory = () => <CountingComponent />;

export default {
  category: 'Demo / Test',
};
