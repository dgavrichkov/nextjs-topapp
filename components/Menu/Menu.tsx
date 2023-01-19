import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
	const router = useRouter();

	const openSecondLevel = (secondCategory: string) => {
		if (!setMenu) { return; }
		setMenu(menu.map(m => {
			if (m._id.secondCategory === secondCategory) {
				m.isOpened = !m.isOpened;
			}
			return m;
		}));
	};

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(item => (
					<div key={item.route}>
						<Link href={`/${item.route}`}>
							<div
								className={cn(styles.menu__firstLevelItem, {
									[styles.active]: item.id === firstCategory,
								})}
							>
								<div>{item.icon}</div>
								<span>{item.name}</span>
							</div>
						</Link>
						{item.id === firstCategory && buildSecondLevel(item)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (flMenuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.menu__secondLevelWrapper}>
				{menu.map(menuItem => {
					if (menuItem.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						menuItem.isOpened = true;
					}
					return (
						<div key={menuItem._id.secondCategory}>
							<div
								className={styles.menu__secondLevelItem}
								onClick={() => openSecondLevel(menuItem._id.secondCategory)}
							>
								{menuItem._id.secondCategory}
							</div>
							<div
								className={cn(styles.menu__thirdLevelWrapper, {
									[styles.opened]: menuItem.isOpened
								})}
							>
								{buildThirdLevel(menuItem.pages, flMenuItem.route)}
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return (
			pages.map(page => (
				<Link key={page._id} href={`/${route}/${page.alias}`}>
					<div
						className={cn(styles.menu__thirdLevelItem, {
							[styles.active]: `/${route}/${page.alias}` === router.asPath
						})}
					>{page.category}</div>
				</Link>
			))
		);
	};

	return (
		<div className={styles.menu}>
			{buildFirstLevel()}
		</div>
	);
};