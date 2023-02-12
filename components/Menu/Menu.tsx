import { KeyboardEvent, useContext } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { AppContext } from '../../context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import styles from './Menu.module.scss';

export const Menu = (): JSX.Element => {
	const {menu, setMenu, firstCategory} = useContext(AppContext);
	const router = useRouter();

	const variants = {
		visible: {
			height: 'auto',
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1,
			}
		},
		hidden: { 
			height: 0,
		},
	};

	const childrenVariants = {
		visible: {
			transform: 'scale(1)',
			opacity: 1,
		},
		hidden: { 
			opacity: 0,
			transform: 'scale(0)',
		},
	};

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

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if(key.code === "Space" || key.code === "Enter") {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
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
								tabIndex={0}
								className={styles.menu__secondLevelItem}
								onClick={() => openSecondLevel(menuItem._id.secondCategory)}
								onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, menuItem._id.secondCategory)}
							>
								{menuItem._id.secondCategory}
							</div>
							<motion.div
								layout
								variants={variants}
								initial={menuItem.isOpened ? 'visible' : 'hidden'}
								animate={menuItem.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.menu__thirdLevelWrapper)}
							>
								{buildThirdLevel(menuItem.pages, flMenuItem.route, menuItem.isOpened ?? false)}
							</motion.div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(page => (
				<motion.div
					key={page._id}
					variants={childrenVariants}
				>
					<Link
						tabIndex={isOpened ? 0 : -1}
						href={`/${route}/${page.alias}`}
						className={cn(styles.menu__thirdLevelItem, {
							[styles.active]: `/${route}/${page.alias}` === router.asPath
						})}
					>
						{page.category}
					</Link>
				</motion.div>
				
			))
		);
	};

	return (
		<nav role="navigation">
			{buildFirstLevel()}
		</nav>
	);
};