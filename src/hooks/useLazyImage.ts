import { useEffect, useRef, useState } from 'react';

export const useLazyImage = (src: string, placeholder?: string) => {
    const [imageSrc, setImageSrc] = useState(placeholder || '');
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!src) {
            setError(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = new Image();
                        img.src = src;

                        img.onload = () => {
                            setImageSrc(src);
                            setIsLoaded(true);
                            setError(false);
                        };

                        img.onerror = () => {
                            setError(true);
                        };

                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px',
                threshold: 0.01,
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [src]);

    return { imgRef, imageSrc, isLoaded, error };
};