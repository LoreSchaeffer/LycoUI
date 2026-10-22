import React from 'react';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; }
export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(({children, className = '', ...props}, ref) => <div ref={ref} className={`modal-header ${className}`} {...props}>{children}</div>);
ModalHeader.displayName = 'ModalHeader';

export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { children: React.ReactNode; as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; }
export const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(({children, className = '', as: Component = 'h3', ...props}, ref) => <Component ref={ref} className={`modal-title ${className}`} {...props}>{children}</Component>);
ModalTitle.displayName = 'ModalTitle';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; }
export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(({children, className = '', ...props}, ref) => <div ref={ref} className={`modal-body ${className}`} {...props}>{children}</div>);
ModalBody.displayName = 'ModalBody';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; }
export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(({children, className = '', ...props}, ref) => <div ref={ref} className={`modal-footer ${className}`} {...props}>{children}</div>);
ModalFooter.displayName = 'ModalFooter';

