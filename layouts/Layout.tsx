import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import { LayoutProps } from './LayoutProps';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import styles from './Layout.module.scss';
import { AppContextProvider, IAppContext } from '../context';

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<div className={cn(styles.layout)}>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<main className={styles.content} >{children}</main>
			<Footer className={styles.footer} />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	};
};