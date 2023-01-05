import cn from 'classnames';
import { ButtonProps } from './ButtonProps';
import ArrowIcon from './arrow.svg';
import styles from './Button.module.scss';

export const Button = ({ appearance, children, className, arrow = 'none', ...props }: ButtonProps): JSX.Element => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost'
			})}
			{...props}
		>
			{children}
			{arrow !== 'none' && (
				<span className={cn(styles.arrow, {
					[styles.down]: arrow == 'down'
				})}>
					<ArrowIcon />
				</span>
			)}
		</button>
	);
};
