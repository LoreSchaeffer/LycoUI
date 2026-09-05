import {useEffect, useState} from 'react';

/**
 * A custom hook to evaluate a media query and return a boolean indicating
 * if the query currently matches.
 *
 * @param query The media query string to evaluate (e.g., '(max-width: 768px)')
 * @returns boolean True if the media query matches, false otherwise
 */
export function useMediaQuery(query: string): boolean {
    const getMatches = (q: string): boolean => {
        // Prevent SSR issues
        if (typeof window !== 'undefined') {
            return window.matchMedia(q).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState<boolean>(() => getMatches(query));

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const matchMedia = window.matchMedia(query);

        // Triggered at the first client-side load and if query changes
        setMatches(matchMedia.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setMatches(e.matches);
        };

        // Use modern EventListener if available, fallback to deprecated addListener
        if (matchMedia.addEventListener) {
            matchMedia.addEventListener('change', handleChange);
        } else {
            matchMedia.addListener(handleChange);
        }

        return () => {
            if (matchMedia.removeEventListener) {
                matchMedia.removeEventListener('change', handleChange);
            } else {
                matchMedia.removeListener(handleChange);
            }
        };
    }, [query]);

    return matches;
}
