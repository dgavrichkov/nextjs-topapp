import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { AppContext } from '../../context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import styles from './Menu.module.scss';


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
					<div key={item.route} className={styles.menu__firstLevelWrap}>
						<Link
							href={`/${item.route}`}
							className={cn(styles.menu__firstLevelItem, {
								[styles.active]: item.id === firstCategory,
							})}
						>
							{item.icon}
							<span>{item.name}</span>
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
		<div>
			{buildFirstLevel()}
		</div>
	);
};