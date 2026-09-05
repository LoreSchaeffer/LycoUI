import React, {forwardRef, memo, useState} from 'react';
import './Avatar.scss';
import clsx from 'clsx';

/**
 * AvatarProps.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The URL of the image to display.
     */
    src?: string;
    /**
     * The alt text for the image.
     */
    alt?: string;
    /**
     * A fallback to display if the image is missing or fails to load.
     * Can be text initials or a React node (like an Icon).
     */
    fallback?: React.ReactNode;
    /**
     * The size of the avatar.
     * @default "md"
     */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /**
     * The shape of the avatar.
     * @default "circle"
     */
    shape?: 'circle' | 'square';
}

/**
 * Avatar component.
 * Displays a user profile image or a fallback node.
 */
export const Avatar = memo(forwardRef<HTMLDivElement, AvatarProps>(
    ({src, alt = '', fallback, size = 'md', shape = 'circle', className, ...props}, ref) => {
        const [imageFailed, setImageFailed] = useState(false);

        const handleError = () => {
            setImageFailed(true);
        };

        const shouldShowFallback = !src || imageFailed;

        return (
            <div
                ref={ref}
                className={clsx(
                    'avatar',
                    `avatar--${size}`,
                    `avatar--${shape}`,
                    className
                )}
                {...props}
            >
                {shouldShowFallback ? (
                    <div className="avatar__fallback">
                        {fallback}
                    </div>
                ) : (
                    <img
                        src={src}
                        alt={alt}
                        className="avatar__image"
                        onError={handleError}
                    />
                )}
            </div>
        );
    }
));
Avatar.displayName = 'Avatar';




