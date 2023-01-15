import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ParProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	children: ReactNode;
	size?: 'sm' | 'md' | 'lg'
}