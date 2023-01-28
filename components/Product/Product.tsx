import cn from 'classnames';
import { ProductProps } from './ProductProps';
import styles from './Product.module.scss';
import { Rating } from '../Rating';
import { Tag } from '../Tag';
import { Button } from '../Button';
import { Card } from '../Card';


export const Product = ({ product, className }: ProductProps): JSX.Element => {
	return (
		<Card 
			className={cn(styles.product, className)}
		>
			<div className={styles.logo}>
				<img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} />
			</div>
			<div className={styles.title}>{product.title}</div>
			<div className={styles.price}>{product.price}</div>
			<div className={styles.credit}>{product.credit}</div>
			<div className={styles.rating}>
				<Rating rating={product.reviewAvg ?? product.initialRating}/>
			</div>
			<div className={styles.tags}>
				{product.categories.map(category => (
					<Tag key={category} color='ghost'>{category}</Tag>
				))}
			</div>
			<div className={styles.priceTitle}>цена</div>
			<div className={styles.creditTitle}>в кредит</div>
			<div className={styles.reviewsTitle}>
				{`${product.reviewCount} отзывов`}
			</div>
			<div className={styles.divider}><hr /></div>
			<div className={styles.description}>{product.description}</div>
			<div className={styles.features}>features</div>
			<div className={styles.advBlock}>
				<div className={styles.advBlock__advantages}>
					Преимущества
					{product.advantages}
				</div>
				<div className={styles.advBlock__disadvantages}>
					Недостатки
					{product.disadvantages}
				</div>
			</div>
			<div className={styles.divider}><hr /></div>
			<div className={styles.actions}>
				<Button appearance='primary'>Узнать подробнее</Button>
				<Button appearance='ghost' arrow='right'>Читать отзывы</Button>
			</div>
		</Card>
	);
};