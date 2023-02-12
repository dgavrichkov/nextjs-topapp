import cn from 'classnames';
import { SortEnum, SortProps } from './SortProps';
import SortIcon from './sort.svg';
import styles from './Sort.module.scss';

export const Sort = ({ sort, setSort, className, ...restProps }: SortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...restProps}>
			<div className={styles.sortName} id="sort">Сортировка</div>
			<button
				id="sortRating"
				onClick={() => setSort(SortEnum.Rating)}
				className={cn(styles.sort__item, {
					[styles.active]: sort === SortEnum.Rating
				})}
				aria-selected={sort === SortEnum.Rating}
				aria-labelledby="sort sortRating"
			>
				<SortIcon />
				По&nbsp;рейтингу
			</button>
			<button
				id="sortPrice"
				onClick={() => setSort(SortEnum.Price)}
				className={cn(styles.sort__item, {
					[styles.active]: sort === SortEnum.Price
				})}
				aria-selected={sort === SortEnum.Price}
				aria-labelledby="sort sortPrice"
			>
				<SortIcon />
				По&nbsp;цене
			</button>
		</div>
	);
};