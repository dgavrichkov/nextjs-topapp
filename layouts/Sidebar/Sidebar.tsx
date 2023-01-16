import cn from 'classnames';
import { SidebarProps } from './SidebarProps';
import styles from './Sidebar.module.scss';


export const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
	return (
		<div {...props}>
			Sidebar
		</div>
	);
};