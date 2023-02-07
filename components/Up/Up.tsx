import { motion, useAnimation } from 'framer-motion';
import cn from 'classnames';
import styles from './Up.module.scss';
import IconChevron from './chevron.svg';
import { useScrollY } from '../../hooks/useScrollY';
import { useEffect } from 'react';

export const Up = (): JSX.Element => {
	const control = useAnimation();
	const y = useScrollY();

	useEffect(() => {
		control.start({opacity: y / document.body.scrollHeight});
	}, [y, control]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	return (
		<motion.button
			type="button"
			className={cn(styles.up)}
			onClick={scrollToTop}
			animate={control}
			initial={{opacity: 0}}
		>
			<IconChevron />
		</motion.button>
	);
};