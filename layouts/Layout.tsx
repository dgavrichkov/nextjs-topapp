import React, { FunctionComponent, useState, KeyboardEvent, useRef } from 'react';
import cn from 'classnames';
import { LayoutProps } from './LayoutProps';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import styles from './Layout.module.scss';
import { AppContextProvider, IAppContext } from '../context';
import { Up } from '../components';

const Layout = ({ children }: LayoutProps): JSX.Element => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState(false);
	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (key: KeyboardEvent) => {
		if (key.code === "Space" || key.code === "Enter") {
			key.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	};

	return (
		<div className={cn(styles.layout)}>
			<a
				onFocus={() => setIsSkipLinkDisplayed(true)}
				onKeyDown={skipContentAction}
				tabIndex={1}
				className={cn(styles.skipLink, {
					[styles.skipLink__displayed]: isSkipLinkDisplayed,
				})}
			>
				Сразу к контенту
			</a>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<main
				className={styles.content}
				ref={bodyRef}
				tabIndex={0}
				role="main"
			>
				{children}
			</main>
			<Footer className={styles.footer} />
			<Up />
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