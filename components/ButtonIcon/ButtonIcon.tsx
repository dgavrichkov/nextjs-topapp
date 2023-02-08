import cn from 'classnames';
import { ButtonIconProps, Icons } from './ButtonIconProps';
import styles from './ButtonIcon.module.scss';

export const ButtonIcon = ({ appearance, icon, className, ...props }: ButtonIconProps): JSX.Element => {
	const IconComponent = Icons[icon];
	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.white]: appearance == 'white'
			})}
			{...props}
		>
			<IconComponent />
		</button>
	);
};
