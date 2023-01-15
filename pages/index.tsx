import { Button, HTag, Par, Tag } from '../components';

export default function Home(): JSX.Element {
	return (
		<div>
			<HTag tag='h1'>ASS</HTag>
			<Button appearance='primary' arrow='right'>Button</Button>
			<Button appearance='ghost' arrow='right'>Button ghost</Button>
			<Par size="lg">paragraph lg</Par>
			<Par size="md">paragraph md</Par>
			<Par>paragraph sm</Par>
			<Tag color='ghost' size='lg'>Tag 1</Tag>
			<Tag color='green'>Tag 1</Tag>
			<Tag color='red'>Tag 1</Tag>
			<Tag color='grey'>Tag 1</Tag>
			<Tag color='primary' href='https://sosibibu'>Tag 1</Tag>
		</div>
	);
}
