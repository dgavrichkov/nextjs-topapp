import cn from 'classnames';
import { Menu, Search } from '../../components';
import { SidebarProps } from './SidebarProps';
import Logo from '../logo.svg';
import styles from './Sidebar.module.scss';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Logo />
			<Search />
			<Menu />
		</div>
	);
};