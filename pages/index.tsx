import { useState } from 'react';
import { Rating } from '../components';
import { withLayout } from '../layouts';

function Home(): JSX.Element {
	const [rating, setRating] = useState(4);

	return (
		<>
			Home Component
			<Rating rating={rating} setRating={setRating} isEditable />
		</>
	);
}

export default withLayout(Home);