import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import { InputProps } from './InputProps';
import styles from './Input.module.scss';


export const Input = forwardRef(({ error, className, ...restProps }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
	return (
		<div className={cn(className, styles.inputWrapper)}>
			<input
				ref={ref}
				className={cn(className, styles.input, {
					[styles.error]: error
				})}
				{...restProps}
			/>
			{error ? (<div role="alert" className = {styles.errorMessage}>{error.message}</div>) : null}
		</div>
	);
});