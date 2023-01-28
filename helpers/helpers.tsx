import IconCourses from './icons/courses.svg';
import IconBooks from './icons/books.svg';
import IconServices from './icons/services.svg';
import IconGoods from './icons/goods.svg';
import { TopLevelCategory } from '../interfaces/page.interface';
import { FirstLevelMenuItem } from '../interfaces/menu.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{ id: TopLevelCategory.Courses, route: 'courses', name: 'Курсы', icon: <IconCourses /> },
	{ id: TopLevelCategory.Products, route: 'services', name: 'Сервисы', icon: <IconServices /> },
	{ id: TopLevelCategory.Books, route: 'books', name: 'Книги', icon: <IconBooks /> },
	{ id: TopLevelCategory.Products, route: 'products', name: 'Продукты', icon: <IconGoods /> },
];

export const toPriceRu = (price: number) => {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
};

export const declanationOfNum = (num: number, titles: [string, string, string]): string => {
	const cases = [2, 0, 1, 1, 1, 2];
	if (num % 100 > 4 && num % 100 < 20) {
		return titles[2];
	}

	return titles[cases[(num % 10 < 5) ? num % 10 : 5]];
};