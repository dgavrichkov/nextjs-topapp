import { useState } from 'react';
import { Rating } from '../components';

export default function Home(): JSX.Element {
	const [rating, setRating] = useState(4);

	return (
		<div>
			Home Component
			<Rating rating={rating} setRating={setRating} isEditable />
		</div>
	);
}
