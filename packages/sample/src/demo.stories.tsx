import { createSignal, onCleanup } from 'solid-js';
// import { useCodex } from '../src/api';

const [count, setCount] = createSignal(0);

const Counter = () => {
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
    </div>
  );
};

export const CounterStory = () => <Counter />;
CounterStory.storyName = 'Counter';

const CountingComponent = () => {
	const [count, setCount] = createSignal(0);
	const interval = setInterval(
		() => setCount(c => c + 1),
		1000
	);
	onCleanup(() => clearInterval(interval));
	return <div>Count value is {count()}</div>;
};
export const CountingStory = () => <CountingComponent />;

export default {
  category: 'Demo / Test',
};
