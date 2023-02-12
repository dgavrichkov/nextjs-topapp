import { KeyboardEvent, useContext, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { AppContext } from '../../context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import styles from './Menu.module.scss';

export const Menu = (): JSX.Element => {
	const {menu, setMenu, firstCategory} = useContext(AppContext);
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(undefined);
	const router = useRouter();
	const shouldReduceMotion = useReducedMotion();
	
	const variants = {
		visible: {
			height: 'auto',
			transition: shouldReduceMotion ? {} : {
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
				setAnnounce(m.isOpened ? 'closed' : 'opened');
				m.isOpened = !m.isOpened;
			}
			return m;
		}));
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code === "Space" || key.code === "Enter") {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const buildFirstLevel = () => {
		return (
			<ul className={styles.menu}>
				{firstLevelMenu.map(item => (
					<li
						key={item.route}
						className={styles.menu__firstLevelWrap}
						aria-expanded={item.id === firstCategory}
					>
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
					</li>
				))}
			</ul>
		);
	};


	const buildSecondLevel = (flMenuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.menu__secondLevelWrapper}>
				{menu.map(menuItem => {
					if (menuItem.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						menuItem.isOpened = true;
					}
					return (
						<li key={menuItem._id.secondCategory}>
							<button
								tabIndex={0}
								className={styles.menu__secondLevelItem}
								onClick={() => openSecondLevel(menuItem._id.secondCategory)}
								onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, menuItem._id.secondCategory)}
								aria-expanded={menuItem.isOpened}
							>
								{menuItem._id.secondCategory}
							</button>
							<motion.ul
								layout
								variants={variants}
								initial={menuItem.isOpened ? 'visible' : 'hidden'}
								animate={menuItem.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.menu__thirdLevelWrapper)}
							>
								{buildThirdLevel(menuItem.pages, flMenuItem.route, menuItem.isOpened ?? false)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(page => (
				<motion.li
					key={page._id}
					variants={childrenVariants}
				>
					<Link
						tabIndex={isOpened ? 0 : -1}
						href={`/${route}/${page.alias}`}
						className={cn(styles.menu__thirdLevelItem, {
							[styles.active]: `/${route}/${page.alias}` === router.asPath
						})}
						aria-current={`/${route}/${page.alias}` === router.asPath ? true : false}
					>
						{page.category}
					</Link>
				</motion.li>
				
			))
		);
	};

	return (
		<nav role="navigation">
			{announce && <span role="log" className="visually-hidden">{announce === 'opened' ? 'развернуто' : 'свернуто'}</span>}
			{buildFirstLevel()}
		</nav>
	);
};