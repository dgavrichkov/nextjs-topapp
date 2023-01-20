import cn from 'classnames';
import { CardProps } from './CardProps';
import styles from './Card.module.scss';


export const Card = ({ color = 'white', children, className, ...restProps }: CardProps): JSX.Element => {
	return (
		<div 
			className={cn(styles.card, className, {
				[styles.white]: color === 'white',
				[styles.blue]: color === 'blue',
			})}
			{...restProps}
		>{children}</div>
	);
};