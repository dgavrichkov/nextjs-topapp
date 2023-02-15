import { HTag } from '../components';
import { withLayout } from '../layouts';

const Error500 = (): JSX.Element => {
	return (
		<>
			<HTag tag='h1'>500 ошибка</HTag>
		</>
	)
}

export default withLayout(Error500);
