import React from 'react';

export type PolymorphicProps<C extends React.ElementType, P = {}> = React.PropsWithChildren<P & { as?: C }> & Omit<React.ComponentPropsWithoutRef<C>, keyof P | 'as'>;

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];
