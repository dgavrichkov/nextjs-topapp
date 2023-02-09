import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { HeaderProps } from './HeaderProps';
import styles from './Header.module.scss';
import Logo from '../logo.svg';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Sidebar } from '../Sidebar';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const [isMenuOpened, setIsMenuOpened] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setIsMenuOpened(false);
	}, [router]);

	const handleOpen = () => {
		setIsMenuOpened(true);
	};

	const handleClose = () => {
		setIsMenuOpened(false);
	};

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20,
			}
		},
		closed: {
			opacity: 0,
			x: '100%'
		}
	};

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo />
			<ButtonIcon appearance='white' icon='menu' onClick={handleOpen}/>
			<motion.div
				className={styles.mobileMenu}
				variants={variants}
				initial={'closed'}
				animate={isMenuOpened ? 'opened' : 'closed'}
			>
				<Sidebar />
				<ButtonIcon className={styles.menuClose} appearance='white' icon='close' onClick={handleClose} />
			</motion.div>
		</header>
	);
};