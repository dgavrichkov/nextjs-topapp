import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import { TextareaProps } from './TextareaProps';
import styles from './Textarea.module.scss';


export const Textarea = forwardRef(({ error, className, ...restProps }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	return (
		<div className={cn(styles.textareaWrapper, className)}>
			<textarea
				ref={ref}
				className={cn(className, styles.textarea, {
					[styles.error]: error
				})}
				{...restProps}
			></textarea>
			{error ? (<div role="alert" className={styles.errorMessage}>{error.message}</div>) : null}
		</div>
	);
});