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