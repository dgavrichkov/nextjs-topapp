import cn from 'classnames';
import { FooterProps } from './FooterProps';
import styles from './Footer.module.scss';


export const Footer = ({ ...props }: FooterProps): JSX.Element => {
	return (
		<div {...props}>
			Footer
		</div>
	);
};