import cn from 'classnames';
import { SortEnum, SortProps } from './SortProps';
import SortIcon from './sort.svg';
import styles from './Sort.module.scss';

export const Sort = ({ sort, setSort, className, ...restProps }: SortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...restProps}>
			<button
				onClick={() => setSort(SortEnum.Rating)}
				className={cn(styles.sort__item, {
					[styles.active]: sort === SortEnum.Rating
				})}
			>
				<SortIcon />
				По&nbsp;рейтингу
			</button>
			<button
				onClick={() => setSort(SortEnum.Price)}
				className={cn(styles.sort__item, {
					[styles.active]: sort === SortEnum.Price
				})}
			>
				<SortIcon />
				По&nbsp;цене
			</button>
		</div>
	);
};