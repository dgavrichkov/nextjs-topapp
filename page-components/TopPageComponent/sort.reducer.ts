import { SortEnum } from '../../components/Sort/SortProps';
import { ProductModel } from '../../interfaces/product.interface';

export type SortActions = { type: SortEnum.Price } | { type: SortEnum.Rating } | { type: 'Reset', payload: ProductModel[] };

export interface SortReducerState {
	sort: SortEnum;
	products: ProductModel[]
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
	switch(action.type) {
		case SortEnum.Rating:
			return {
				sort: SortEnum.Rating,
				products: state.products.sort((a, b) => a.initialRating > b.initialRating ? -1 : 1)
			};
		case SortEnum.Price:
			return {
				sort: SortEnum.Price,
				products: state.products.sort((a, b) => a.price > b.price ? 1 : -1)
			};
		case 'Reset':
			return {
				sort: state.sort,
				products: action.payload
			};
		default:
			throw new Error('something went wrong on sort type');
	}
};