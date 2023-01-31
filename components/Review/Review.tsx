import cn from 'classnames';
import { ReviewProps } from './ReviewProps';
import styles from './Review.module.scss';
import IconUser from './user.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Par } from '../Par';
import { Rating } from '../Rating';


export const Review = ({ review, className, ...restProps }: ReviewProps): JSX.Element => {
	const {name, title, description, createdAt, rating} = review;

	return (
		<div 
			className={cn(styles.review, className)}
			{...restProps}
		>
			<div className={styles.review__user}>
				<IconUser />
				<div className={styles.review__userinfo}>
					<span className={styles.review__username}>{name}:</span>
					<span className={styles.review__usertitle}>{title}</span>
				</div>
			</div>
			<div className={styles.review__date}>{format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}</div>
			<div className={styles.review__rate}><Rating rating={rating}/></div>
			<Par className={styles.review__description}>{description}</Par>
		</div>
	);
};