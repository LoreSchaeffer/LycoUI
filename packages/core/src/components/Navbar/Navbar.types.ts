import type React from 'react';
import type {Alignment, FullVariant} from '../../types/types';
import type {PolymorphicProps, PolymorphicRef} from '../../types/polymorphic';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'base' | 'dark' | 'light' | 'transparent' | FullVariant;
  dim?: boolean;
  elevation?: '0' | '1' | '2' | '3' | '4';
  position?: 'static' | 'sticky' | 'fixed';
  expand?: 'sm' | 'md' | 'lg' | 'xl' | 'always' | 'never';
  size?: 'sm' | 'md' | 'lg' | number | string;
}

export type NavbarBrandProps<C extends React.ElementType = 'a'> = PolymorphicProps<C, {centered?: boolean}>;
export type NavbarBrandComponent = <C extends React.ElementType = 'a'>(props: NavbarBrandProps<C> & {ref?: PolymorphicRef<C>}) => React.ReactElement;
export interface NavbarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export interface NavbarCollapseProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface NavbarNavProps extends React.HTMLAttributes<HTMLUListElement> {align?: Alignment}
export interface NavbarItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}
export type NavbarLinkProps<C extends React.ElementType = 'a'> = PolymorphicProps<C, {active?: boolean}>;
export type NavbarLinkComponent = <C extends React.ElementType = 'a'>(props: NavbarLinkProps<C> & {ref?: PolymorphicRef<C>}) => React.ReactElement;
export interface NavbarDropdownProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
  title: React.ReactNode;
  unstyled?: boolean;
  align?: 'left' | 'right';
  hideCaret?: boolean;
}
export type NavbarDropdownItemProps<C extends React.ElementType = 'a'> = PolymorphicProps<C, {variant?: 'base' | 'danger' | 'success' | 'warning' | 'primary'}>;
export type NavbarDropdownItemComponent = <C extends React.ElementType = 'a'>(props: NavbarDropdownItemProps<C> & {ref?: PolymorphicRef<C>}) => React.ReactElement;
export interface NavbarDropdownSubMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {title: React.ReactNode}
