import { IconEye, IconHeart } from '@tabler/icons-react';
import { NewsItem } from '../../types/news';
import { formatDate, formatNumber } from '../../utils/formatDate';
import { useLazyImage } from '../../hooks/useLazyImage';
import { cn } from '../../utils/cn';

interface NewsCardProps {
    news: NewsItem;
    showCover?: boolean;
}

export const NewsCard = ({ news, showCover = true }: NewsCardProps) => {
    const coverImage = news.cover?.images[0];

    const { imgRef, imageSrc, isLoaded, error } = useLazyImage(
        coverImage?.m || '',
        'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 300\'%3E%3Crect width=\'400\' height=\'300\' fill=\'%23E5E7EB\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' fill=\'%239CA3AF\'%3ENo image%3C/text%3E%3C/svg%3E'
    );

    const firstRubric = news.rubrics[0];
    const hasImage = coverImage && !error;

    return (
        <article className="flex flex-col gap-4 md:flex-row md:gap-6 group">
            {/* Изображение */}
            {showCover && (
                <div className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0">
                    <div className="relative aspect-[4/3] md:aspect-auto md:h-[200px] overflow-hidden rounded-2xl bg-gray-100">
                        {hasImage ? (
                            <img
                                ref={imgRef}
                                src={imageSrc}
                                alt={news.title}
                                className={cn(
                                    'w-full h-full object-cover transition-all duration-700',
                                    'group-hover:scale-105',
                                    isLoaded ? 'opacity-100' : 'opacity-0'
                                )}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <span className="text-gray-400 text-sm">Нет изображения</span>
                            </div>
                        )}

                        {/* Градиент при наведении */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>
            )}

            {/* Контент */}
            <div className="flex-1 space-y-2">
                {/* Рубрика */}
                {firstRubric && (
                    <span className="inline-block text-sm font-medium text-[#1E7B48] uppercase tracking-wide">
                        {firstRubric.name}
                    </span>
                )}

                {/* Заголовок */}
                <h3 className="text-xl md:text-2xl font-semibold leading-tight text-gray-900 group-hover:text-[#1E7B48] transition-colors line-clamp-3">
                    {news.title}
                </h3>

                {/* Статистика и дата */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 text-sm">
                    <div className="flex items-center gap-1.5">
                        <IconEye size={18} stroke={1.5} />
                        <span>{formatNumber(news.viewCount)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <IconHeart size={18} stroke={1.5} />
                        <span>{formatNumber(news.likeCount)}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">{formatDate(news.publishedAt)}</span>
                </div>
            </div>
        </article>
    );
};