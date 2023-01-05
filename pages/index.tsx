import { Button, HTag } from '../components';

export default function Home(): JSX.Element {
	return (
		<div>
			<HTag tag='h1'>ASS</HTag>
			<Button appearance='primary' arrow='right'>Button</Button>
			<Button appearance='ghost' arrow='right'>Button ghost</Button>
		</div>
	);
}
