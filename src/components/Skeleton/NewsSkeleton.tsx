import { cn } from '../../utils/cn';

interface NewsSkeletonProps {
    count?: number;
    className?: string;
    showCover?: boolean;
}

export const NewsSkeleton = ({ count = 3, className, showCover = true }: NewsSkeletonProps) => {
    return (
        <div className={cn('space-y-6', className)}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="animate-pulse">
                    <div className="flex gap-4">
                        {showCover && (
                            <div className="hidden md:block w-[120px] flex-shrink-0">
                                <div className="aspect-[4/3] bg-gray-200 rounded-xl" />
                            </div>
                        )}
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-32" />
                            <div className="h-5 bg-gray-200 rounded w-full" />
                            <div className="h-5 bg-gray-200 rounded w-3/4" />
                            <div className="flex gap-2 pt-1">
                                <div className="h-4 bg-gray-200 rounded w-16" />
                                <div className="h-4 bg-gray-200 rounded w-12" />
                            </div>
                        </div>
                    </div>
                    {index < count - 1 && <div className="border-b border-gray-100 mt-6" />}
                </div>
            ))}
        </div>
    );
};