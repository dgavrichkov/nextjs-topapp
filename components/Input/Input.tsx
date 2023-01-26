import cn from 'classnames';
import { InputProps } from './InputProps';
import styles from './Input.module.scss';


export const Input = ({ className, ...restProps }: InputProps): JSX.Element => {
	return (
		<input
			className={cn(className, styles.input)}
			{...restProps}
		/>
	);
};