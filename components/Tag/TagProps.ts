import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
	color?: 'ghost' | 'red' | 'grey' | 'green' | 'primary'
	href?: string
	size?: 'sm' | 'lg'
}