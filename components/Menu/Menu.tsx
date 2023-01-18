import { useContext } from 'react';
import cn from 'classnames';
import { AppContext } from '../../context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { TopLevelCategory } from '../../interfaces/page.interface';
import styles from './Menu.module.scss';
import IconCourses from './icons/courses.svg';
import IconBooks from './icons/books.svg';
import IconServices from './icons/services.svg';
import IconGoods from './icons/goods.svg';

const firstLevelMenu: FirstLevelMenuItem[] = [
	{ id: TopLevelCategory.Courses, route: 'courses', name: 'Курсы', icon: <IconCourses /> },
	{ id: TopLevelCategory.Products, route: 'services', name: 'Сервисы', icon: <IconServices /> },
	{ id: TopLevelCategory.Books, route: 'books', name: 'Книги', icon: <IconBooks /> },
	{ id: TopLevelCategory.Products, route: 'products', name: 'Продукты', icon: <IconGoods /> },
];

export const Menu = (): JSX.Element => {
	const {menu, setMenu, firstCategory} = useContext(AppContext);

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(item => (
					<div key={item.route}>
						<a href={`/${item.route}`}>
							<div 
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: item.id === firstCategory,
								})}
							>
								<div>{item.icon}</div>
								<span>{item.name}</span>
							</div>
						</a>
						{item.id === firstCategory && buildSecondLevel(item)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (flMenuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondLevelWrapper}>
				{menu.map(menuItem => (
					<div key={menuItem._id.secondCategory}>
						<div className={styles.secondLevel}>{menuItem._id.secondCategory}</div>
						<div 
							className={cn(styles.secondLevelBlock, {
								[styles.secondLevelBlockOpened]: menuItem.isOpened
							})}
						>
							{buildThirdLevel(menuItem.pages, flMenuItem.route)}
						</div>
					</div>
				))}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return (
			pages.map(page => (
				<a
					key={page._id}
					href={`/${route}/${page.alias}`}
					className={cn(styles.thirdLevel, {
						[styles.active]: false
					})}
				>{page.category}</a>
			))
		);
	};

	return (
		<div className={styles.menu}>
			{buildFirstLevel()}
		</div>
	);
};