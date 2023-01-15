import cn from 'classnames';
import { ParProps } from './ParProps';
import styles from './Par.module.scss';


export const Par = ({ size = 'sm', children }: ParProps) => {
	return <p className={cn({
		[styles.sm]: size === 'sm',
		[styles.md]: size === 'md',
		[styles.lg]: size === 'lg'
	})}>{children}</p>;
};