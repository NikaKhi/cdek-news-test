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
                <div
                    key={index}
                    className="flex flex-col gap-4 md:flex-row animate-pulse"
                >
                    {/* Картинка */}
                    {showCover && (
                        <div className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0">
                            <div className="aspect-[4/3] md:aspect-auto md:h-[200px] bg-gray-200 rounded-2xl" />
                        </div>
                    )}

                    {/* Контент */}
                    <div className="flex-1 space-y-3">
                        {/* Рубрика */}
                        <div className="h-5 bg-gray-200 rounded-full w-24" />

                        {/* Заголовок */}
                        <div className="space-y-2">
                            <div className="h-6 bg-gray-200 rounded-lg w-full" />
                            <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
                        </div>

                        {/* Статистика */}
                        <div className="flex items-center gap-4 pt-1">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-200 rounded" />
                                <div className="h-4 w-10 bg-gray-200 rounded" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-200 rounded" />
                                <div className="h-4 w-10 bg-gray-200 rounded" />
                            </div>
                            <div className="h-4 w-16 bg-gray-200 rounded ml-auto" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};