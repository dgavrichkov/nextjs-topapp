import { motion, useAnimation } from 'framer-motion';
import cn from 'classnames';
import styles from './Up.module.scss';
import { useScrollY } from '../../hooks/useScrollY';
import { useEffect } from 'react';
import { ButtonIcon } from '../ButtonIcon';

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
		<motion.div
			className={cn(styles.up)}
			animate={control}
			initial={{opacity: 0}}
		>
			<ButtonIcon
				onClick={scrollToTop}
				type="button"
				appearance='primary'
				icon='up'
			/>
		</motion.div>
	);
};