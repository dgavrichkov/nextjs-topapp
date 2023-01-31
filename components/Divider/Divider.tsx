import cn from 'classnames';
import { DividerProps } from './DividerProps';
import styles from './Divider.module.scss';


export const Divider = ({ className, ...restProps }: DividerProps): JSX.Element => {
	return (
		<div
			className={cn(styles.divider, className)}
			{...restProps}
		>
			<hr />
		</div>
	);
};