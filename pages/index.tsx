import { Button, HTag, Par } from '../components';

export default function Home(): JSX.Element {
	return (
		<div>
			<HTag tag='h1'>ASS</HTag>
			<Button appearance='primary' arrow='right'>Button</Button>
			<Button appearance='ghost' arrow='right'>Button ghost</Button>
			<Par size="lg">paragraph lg</Par>
			<Par size="md">paragraph md</Par>
			<Par>paragraph sm</Par>
		</div>
	);
}
