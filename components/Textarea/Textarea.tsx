import cn from 'classnames';
import { TextareaProps } from './TextareaProps';
import styles from './Textarea.module.scss';


export const Textarea = ({ className, ...restProps }: TextareaProps): JSX.Element => {
	return (
		<textarea
			className={cn(className, styles.textarea)}
			{...restProps}
		></textarea>
	);
};