import React from 'react';
import cn from 'classnames';
import { SearchProps } from './SearchProps';
import styles from './Search.module.scss';
import { Button } from '../Button';
import { Input } from '../Input';
import { useState } from 'react';
import IconSearch from './search.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...restProps }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();
	
	const goToSearh = () => {
		router.push({
			pathname: './search',
			query: {
				q: search
			}
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			goToSearh();
		}
	};

	return (
		<form
			className={cn(styles.search, className)}
			role="search"
			{...restProps}
		>
			<Input
				className={styles.input}
				placeholder='Поиск...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance='primary'
				className={styles.button}
				onClick={goToSearh}
				aria-label="Искать по сайту"
			>
				<IconSearch />
			</Button>
		</form>
	);
};