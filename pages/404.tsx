import { HTag } from '../components';
import { withLayout } from '../layouts';

export const NotFound = (): JSX.Element => {
	return (
		<>
			<HTag tag='h1'>404 страницы не такой</HTag>
		</>
	)
}

export default withLayout(NotFound);
