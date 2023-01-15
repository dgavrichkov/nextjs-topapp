import cn from 'classnames';
import { ParProps } from './ParProps';
import styles from './Par.module.scss';


export const Par = ({ size = 'sm', children, className, ...restProps }: ParProps): JSX.Element => {
	return (
		<p 
			className={cn(styles.par, className, {
				[styles.sm]: size === 'sm',
				[styles.md]: size === 'md',
				[styles.lg]: size === 'lg'
			})}
			{...restProps}
		>{children}</p>
	);
};