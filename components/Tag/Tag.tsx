import cn from 'classnames';
import { TagProps } from './TagProps';
import styles from './Tag.module.scss';

export const Tag = ({ children, size = 'sm', color = 'ghost', className, href, ...restProps }: TagProps) => {
	return (
		<div
			className={cn(className, styles.tag, {
				[styles.sm]: size === 'sm',
				[styles.lg]: size === 'lg',
				[styles.primary]: color === 'primary',
				[styles.green]: color === 'green',
				[styles.red]: color === 'red',
				[styles.grey]: color === 'grey',
				[styles.ghost]: color === 'ghost'
			})}
			{...restProps}
		>
			{href ? <a href={href}>{children}</a> : <>children</>}
		</div>
	);
};