import cn from 'classnames';
import { Menu } from '../../components';
import { SidebarProps } from './SidebarProps';
import Logo from '../logo.svg';
import styles from './Sidebar.module.scss';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Logo />
			<div>search bar</div>
			<Menu />
		</div>
	);
};