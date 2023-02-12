import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
import { Review } from '../Review';
import { Par } from '../Par';
import { ReviewForm } from '../ReviewForm';


export const Product = motion(forwardRef(({ product, className, ...restProps }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);

	const reviewVariants = {
		visible: {
			height: 'auto',
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1,
			}
		},
		hidden: {
			opacity: 0,
			height: 0,
		},
	};

	const scrollToReview = () => {
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		reviewRef.current?.focus();
	};

	return (
		<div ref={ref} className={cn(className, styles.productWrapper)} {...restProps}>
			<Card
				className={cn(styles.product)}
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
					<span>
						<span className='visually-hidden'>цена</span>{toPriceRu(product.price)}
					</span>
					{product.oldPrice ?
						<Tag color='green'>
							<span className='visually-hidden'>скидка</span>{toPriceRu(product.price - product.oldPrice)}
						</Tag> :
						null
					}
				</div>
				<div className={cn(styles.credit, styles.value)}>
					<span><span className='visually-hidden'>кредит</span>{toPriceRu(product.credit)}<span className={styles.valueSub}>/мес</span></span>
				</div>
				<div className={styles.rating}>
					<span className='visually-hidden'>{'рейтинг ' + (product.reviewAvg ?? product.initialRating)}</span>
					<Rating rating={product.reviewAvg ?? product.initialRating} />
				</div>
				<div className={styles.tags}>
					{product.categories.map(category => (
						<Tag key={category} className={styles.category} color='ghost'>{category}</Tag>
					))}
				</div>
				<div className={cn(styles.priceTitle, styles.subtitle)} aria-hidden={true}>цена</div>
				<div className={cn(styles.creditTitle, styles.subtitle)} aria-hidden={true}>в кредит</div>
				<div className={cn(styles.reviewsTitle, styles.subtitle)}>
					<a href="#ref" onClick={scrollToReview}>{`${product.reviewCount} ${declanationOfNum(product.reviewCount, ['отзыв', 'отзывa', 'отзывов'])}`}</a>
				</div>
				<Divider className={styles.divider} />
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
				<Divider className={cn(styles.divider, styles.hr2)} />
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						appearance='ghost'
						arrow={isReviewOpened ? 'down': 'right'}
						onClick={() => setIsReviewOpened((prev) => !prev)}
						aria-expanded={isReviewOpened}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<motion.div
				variants={reviewVariants}
				initial={isReviewOpened ? 'visible' : 'hidden'}
				animate={isReviewOpened ? 'visible' : 'hidden'}
				className={styles.reviewsCardWrapper}
			>
				<Card
					color='blue'
					className={cn(styles.reviewsCard)}
					ref={reviewRef}
					tabIndex={isReviewOpened ? 0 : -1}
				>
					{product.reviews.length ? (
						<>
							{
								product.reviews.map(review => (
									<Review key={review._id} review={review} />
								))
							}
						</>
					): <Par>Отзывов пока нет</Par>}
					<ReviewForm productId={product._id} isOpened={isReviewOpened} />
				</Card>
			</motion.div>
		</div>	
		
	);
}));