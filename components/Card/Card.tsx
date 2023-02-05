import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import { CardProps } from './CardProps';
import styles from './Card.module.scss';


export const Card = forwardRef(({ color = 'white', children, className, ...restProps }: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	return (
		<div
			className={cn(styles.card, className, {
				[styles.white]: color === 'white',
				[styles.blue]: color === 'blue',
			})}
			ref={ref}
			{...restProps}
		>
			{children}
		</div>
	);
});