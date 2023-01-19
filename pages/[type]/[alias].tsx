import React from 'react';
import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from 'next';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { withLayout } from '../../layouts';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from '../../helpers/helpers';

function Course({ menu, page, products }: CourseProps): JSX.Element {
	return (
		<>
			{products && (
				products.map(p => (
					<div key={p._id}>
						<div>{p._id}</div>
						<div>{p.title}</div>
						<div>{p.description}</div>
						<hr/>
					</div>
				))
			)}
		</>
	);
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (const flmenu of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
			firstCategory: flmenu.id
		});
		paths = paths.concat(menu.flatMap(m => m.pages.map(p => `/${flmenu.route}/${p.alias}`)));
	}
	
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		};
	}
	const firstCategoryItem = firstLevelMenu.find(menu => menu.route === params.type);
	if (!firstCategoryItem) {
		return {
			notFound: true
		};
	}
	try {
		const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
			firstCategory: firstCategoryItem.id
		});
		const { data: page } = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
		const { data: products } = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
			category: page.category,
			limit: 10,
		});
		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products
			}
		};
	} catch(e) {
		return {
			notFound: true
		};
	}
};

interface CourseProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
}