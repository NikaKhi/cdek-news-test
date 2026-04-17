import { useState } from 'react';
import {
    IconChevronLeft,
    IconChevronRight,
    IconAlertCircle,
    IconRefresh,
} from '@tabler/icons-react';
import { useNewsFeed } from '../../hooks/useNewsFeed';
import { NewsCard } from './NewsCard';
import { NewsSkeleton } from '../Skeleton/NewsSkeleton';
import { NewsFeedConfig } from '../../types/news';
import { formatMonthYear, formatWeekdayDate } from '../../utils/formatDate';
import { cn } from '../../utils/cn';

interface NewsFeedProps {
    config: NewsFeedConfig;
    className?: string;
}

export const NewsFeed = ({ config, className }: NewsFeedProps) => {
    const { data, loading, error, page, setPage, refetch } = useNewsFeed(
        config.feedType,
        1,
        3
    );
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handlePageChange = async (newPage: number) => {
        if (newPage === page) return;
        setIsTransitioning(true);
        setPage(newPage);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const isFirstPage = page === 1;
    const isLastPage = data ? page >= data.totalPages : true;

    const displayDate = data?.news[0]?.publishedAt || new Date().toISOString();
    const monthYear = formatMonthYear(displayDate);
    const weekdayDate = formatWeekdayDate(displayDate);

    // Состояние загрузки
    if (loading && !data) {
        return (
            <div className={cn('w-full max-w-[347px] md:max-w-[589px] mx-auto', className)}>
                <div className="mb-4">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{config.title}</h2>
                    <p className="text-sm text-gray-500">{monthYear}</p>
                </div>
                <NewsSkeleton count={3} showCover={config.showCoverAlways !== false} />
            </div>
        );
    }

    // Состояние ошибки
    if (error) {
        return (
            <div className={cn('w-full max-w-[347px] md:max-w-[589px] mx-auto', className)}>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">{config.title}</h2>
                <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-3">
                        <IconAlertCircle size={24} className="text-red-500" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">Ошибка загрузки</h3>
                    <p className="text-sm text-gray-500 mb-4">{error}</p>
                    <button
                        onClick={refetch}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#1E7B48] text-white text-sm rounded-full hover:bg-[#166035] transition-colors"
                    >
                        <IconRefresh size={16} />
                        <span>Попробовать снова</span>
                    </button>
                </div>
            </div>
        );
    }

    // Пустое состояние
    if (data && data.news.length === 0) {
        return (
            <div className={cn('w-full max-w-[347px] md:max-w-[589px] mx-auto', className)}>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Важные новости</h2>
                <p className="text-sm text-gray-500 mb-4">{weekdayDate}</p>
                <div className="flex flex-col items-center justify-center py-8 text-center bg-white rounded-2xl">
                    <img
                        src="/images/cart.png"
                        alt="Нет новостей"
                        className="w-32 h-32 md:w-40 md:h-40 object-contain mb-3"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    <p className="text-base font-bold text-gray-900">Новых новостей нет</p>
                </div>
            </div>
        );
    }
    return (
        <div className={cn('w-full max-w-[347px] md:max-w-[589px] mx-auto', className)}>
            {/* Заголовок секции */}
            <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{config.title}</h2>
                <p className="text-sm text-gray-500">{monthYear}</p>
            </div>

            {/* Список новостей */}
            <div
                className={cn(
                    'space-y-6',
                    isTransitioning && 'opacity-50 transition-opacity duration-300'
                )}
            >
                {data?.news.map((news, index) => (
                    <div key={news.id}>
                        <NewsCard
                            news={news}
                            showCover={config.showCoverAlways !== false || index === 0}
                            isFirst={index === 0}
                            newsIndex={index}
                            sectionId={config.id}
                        />

                        {/* Разделитель между новостями */}
                        {index < data.news.length - 1 && (
                            <div className="border-b border-gray-100 mt-6" />
                        )}
                    </div>
                ))}
            </div>

            {/* Пагинация - только стрелки справа */}
            {data && data.totalPages > 1 && (
                <div className="flex items-center justify-end gap-2 mt-6 pt-2">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={isFirstPage || isTransitioning}
                        className={cn(
                            'w-8 h-8 flex items-center justify-center rounded-full transition-all',
                            isFirstPage
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-gray-100'
                        )}
                        aria-label="Предыдущая страница"
                    >
                        <IconChevronLeft size={18} />
                    </button>

                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={isLastPage || isTransitioning}
                        className={cn(
                            'w-8 h-8 flex items-center justify-center rounded-full transition-all',
                            isLastPage
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-gray-100'
                        )}
                        aria-label="Следующая страница"
                    >
                        <IconChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};