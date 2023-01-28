import cn from 'classnames';
import { ProductProps } from './ProductProps';
import styles from './Product.module.scss';


export const Product = ({ product, className, ...restProps }: ProductProps): JSX.Element => {
	return (
		<div 
			className={cn(styles.product, className, {
			})}
			{...restProps}
		>
			{product.title}
		</div>
	);
};