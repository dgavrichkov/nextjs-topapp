import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { HTag, Input, Rating, Textarea } from '../components';
import { withLayout } from '../layouts';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
	const [rating, setRating] = useState(4);
	console.log(menu, firstCategory);

	return (
		<>
			Home Component
			<HTag tag='h1'>{firstCategory}</HTag>
			<Rating rating={rating} setRating={setRating} isEditable />
			<Input placeholder='input'/>
			<br />
			<Textarea placeholder='textarea' />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory,
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}