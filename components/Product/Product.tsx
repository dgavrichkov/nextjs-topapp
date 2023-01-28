import cn from 'classnames';
import Image from 'next/image';
import { ProductProps } from './ProductProps';
import styles from './Product.module.scss';
import { Rating } from '../Rating';
import { Tag } from '../Tag';
import { Button } from '../Button';
import { Card } from '../Card';
import { declanationOfNum, toPriceRu } from '../../helpers/helpers';
import { Divider } from '../Divider';


export const Product = ({ product, className }: ProductProps): JSX.Element => {
	return (
		<Card 
			className={cn(styles.product, className)}
		>
			<div className={styles.logo}>
				<Image 
					src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
					alt={product.title}
					width={70}
					height={70}
				/>
			</div>
			<div className={styles.title}>{product.title}</div>
			<div className={cn(styles.price, styles.value)}>
				{toPriceRu(product.price)}
				{product.oldPrice ? <Tag color='green'>{toPriceRu(product.price - product.oldPrice)}</Tag> : null}
			</div>
			<div className={cn(styles.credit, styles.value)}>
				{toPriceRu(product.credit)}<span>/мес</span>
			</div>
			<div className={styles.rating}>
				<Rating rating={product.reviewAvg ?? product.initialRating}/>
			</div>
			<div className={styles.tags}>
				{product.categories.map(category => (
					<Tag key={category} className={styles.category} color='ghost'>{category}</Tag>
				))}
			</div>
			<div className={cn(styles.priceTitle, styles.subtitle)}>цена</div>
			<div className={cn(styles.creditTitle, styles.subtitle)}>в кредит</div>
			<div className={cn(styles.reviewsTitle, styles.subtitle)}>
				{`${product.reviewCount} ${declanationOfNum(product.reviewCount, ['отзыв', 'отзывa', 'отзывов'])}`}
			</div>
			<Divider className={styles.divider}/>
			<div className={styles.description}>{product.description}</div>
			<div className={styles.features}>
				<dl>
					{product.characteristics.map(char => (
						<div key={char.name}>
							<dt>{char.name}</dt>
							<span></span>
							<dd>{char.value}</dd>
						</div>
					))}
				</dl>
				{product.tags.map(tag => (
					<Tag key={tag} color='ghost'>{tag}</Tag>
				))}
			</div>
			<div className={styles.advBlock}>
				<div className={styles.advBlock__advantages}>
					<h4>Преимущества</h4>
					<div>{product.advantages || 'Не обнаружено'}</div>
				</div>
				
				<div className={styles.advBlock__disadvantages}>
					<h4>Недостатки</h4>
					<div>{product.disadvantages || 'Не обнаружено'}</div>
				</div>
			</div>
			<Divider className={styles.divider}/>
			<div className={styles.actions}>
				<Button appearance='primary'>Узнать подробнее</Button>
				<Button appearance='ghost' arrow='right'>Читать отзывы</Button>
			</div>
		</Card>
	);
};