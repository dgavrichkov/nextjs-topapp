import { Advantages, HTag, Product, Sort, Tag } from '../../components';
import { TopPageComponentProps } from './TopPageComponentProps';
import styles from './TopPageComponent.module.scss';
import { Card } from '../../components/Card';
import { HhData } from '../../components/HhData';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/SortProps';
import { useReducer } from 'react';
import { sortReducer } from './sort.reducer';

export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {
	const { advantages, seoText, tags } = page;
	const [{ products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort});
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<HTag tag='h1'>{page.title}</HTag>
				{products && <Tag color='grey' size='lg'>{products.length}</Tag>}
				<Sort sort={sort} setSort={setSort}/>
			</div>
			<div>
				{sortedProducts && (
					sortedProducts.map(product => (
						<Card key={product._id}><Product product={product} /></Card>
					))
				)}
			</div>
			<section className={styles.toppage__hhru}>
				<div className={styles.hhTitle}>
					<HTag tag='h2'>Вакансии - {page.category}</HTag>
					<Tag color='red' size='lg'>hh.ru</Tag>
				</div>
				{firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
			</section>
			{advantages?.length ? (
				<section className={styles.toppage__advantages}>
					<HTag tag='h2'>Преимущества</HTag>
					<Advantages advantages={advantages} />
				</section>
			) : null}
			{seoText ? (
				<section className={styles.toppage__seo}>
					<div dangerouslySetInnerHTML={{ __html: seoText }} />
				</section>
			) : null}
			<section>
				<HTag tag='h2'>Получаемые навыки</HTag>
				<div className={styles.toppage__skillsList}>
					{tags.map(tag => (
						<Tag key={tag} color='primary'>{tag}</Tag>
					))}
				</div>
			</section>
		</div>
	);
};