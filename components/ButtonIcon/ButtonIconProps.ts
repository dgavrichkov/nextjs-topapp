import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import IconChevron from './chevron.svg';
import IconMenu from './burgir.svg';
import IconClose from './close.svg';

export const Icons = {
	up: IconChevron,
	close: IconClose,
	menu: IconMenu,
};

export type IconName = keyof typeof Icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	appearance: 'primary' | 'white';
	icon: IconName;
}