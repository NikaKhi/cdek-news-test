import { useState } from 'react';
import {
    IconChevronLeft,
    IconChevronRight,
    IconMoodEmpty,
    IconAlertCircle,
    IconRefresh,
} from '@tabler/icons-react';
import { useNewsFeed } from '../../hooks/useNewsFeed';
import { NewsCard } from './NewsCard';
import { NewsSkeleton } from '../Skeleton/NewsSkeleton';
import { NewsFeedConfig } from '../../types/news';
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

        // Плавное завершение анимации
        setTimeout(() => setIsTransitioning(false), 300);

        // Скролл к началу блока
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isFirstPage = page === 1;
    const isLastPage = data ? page >= data.totalPages : true;

    // Состояние загрузки
    if (loading && !data) {
        return (
            <div className={cn('max-w-4xl mx-auto', className)}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {config.title}
                    </h2>
                </div>
                <NewsSkeleton count={3} showCover={config.showCoverAlways !== false} />
            </div>
        );
    }

    // Состояние ошибки
    if (error) {
        return (
            <div className={cn('max-w-4xl mx-auto', className)}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    {config.title}
                </h2>
                <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center bg-white rounded-3xl border border-gray-100">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                        <IconAlertCircle size={32} className="text-red-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Ошибка загрузки
                    </h3>
                    <p className="text-gray-500 max-w-md mb-6">{error}</p>
                    <button
                        onClick={refetch}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#1E7B48] text-white rounded-full hover:bg-[#166035] transition-colors"
                    >
                        <IconRefresh size={18} />
                        <span>Попробовать снова</span>
                    </button>
                </div>
            </div>
        );
    }

    // Пустое состояние
    if (data && data.news.length === 0) {
        return (
            <div className={cn('max-w-4xl mx-auto', className)}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    {config.title}
                </h2>
                <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center bg-white rounded-3xl border border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <IconMoodEmpty size={40} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                        Новостей пока нет
                    </h3>
                    <p className="text-gray-500">
                        Загляните позже, здесь обязательно что-то появится
                    </p>
                </div>
            </div>
        );
    }

    // Основной контент
    return (
        <div className={cn('max-w-4xl mx-auto', className)}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {config.title}
                </h2>
                {data && data.totalPages > 1 && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {page} / {data.totalPages}
                    </span>
                )}
            </div>

            {/* Список новостей */}
            <div
                className={cn(
                    'space-y-6 transition-opacity duration-300',
                    isTransitioning && 'opacity-50'
                )}
            >
                {data?.news.map((news, index) => (
                    <NewsCard
                        key={news.id}
                        news={news}
                        showCover={
                            config.showCoverAlways !== false ? true : index === 0
                        }
                    />
                ))}
            </div>

            {/* Пагинация */}
            {data && data.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 md:gap-4 mt-8 pt-6 border-t border-gray-200">
                    {/* Кнопка Назад */}
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={isFirstPage || isTransitioning}
                        className={cn(
                            'flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full font-medium transition-all',
                            isFirstPage
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                        )}
                    >
                        <IconChevronLeft size={20} />
                        <span className="hidden sm:inline">Назад</span>
                    </button>

                    {/* Номера страниц */}
                    <div className="flex items-center gap-1">
                        {generatePageNumbers(page, data.totalPages).map((pageNum, idx) => (
                            <PageButton
                                key={idx}
                                pageNum={pageNum}
                                currentPage={page}
                                onPageChange={handlePageChange}
                                disabled={isTransitioning}
                            />
                        ))}
                    </div>

                    {/* Кнопка Вперёд */}
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={isLastPage || isTransitioning}
                        className={cn(
                            'flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full font-medium transition-all',
                            isLastPage
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                        )}
                    >
                        <span className="hidden sm:inline">Вперёд</span>
                        <IconChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

// Компонент кнопки страницы
interface PageButtonProps {
    pageNum: number | '...';
    currentPage: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}

const PageButton = ({ pageNum, currentPage, onPageChange, disabled }: PageButtonProps) => {
    if (pageNum === '...') {
        return (
            <span className="w-10 h-10 flex items-center justify-center text-gray-400">
                •••
            </span>
        );
    }

    const isActive = pageNum === currentPage;

    return (
        <button
            onClick={() => onPageChange(pageNum)}
            disabled={disabled || isActive}
            className={cn(
                'w-10 h-10 rounded-full font-medium transition-all',
                isActive
                    ? 'bg-[#1E7B48] text-white cursor-default'
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
            )}
        >
            {pageNum}
        </button>
    );
};

// Генерация номеров страниц с многоточием
const generatePageNumbers = (
    current: number,
    total: number
): (number | '...')[] => {
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
        return [1, 2, 3, 4, '...', total];
    }

    if (current >= total - 2) {
        return [1, '...', total - 3, total - 2, total - 1, total];
    }

    return [1, '...', current - 1, current, current + 1, '...', total];
};