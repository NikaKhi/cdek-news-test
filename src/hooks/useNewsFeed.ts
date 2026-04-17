import { useState, useEffect, useCallback } from 'react';
import { NewsResponse, FeedType } from '../types/news';
import { fetchNews } from '../services/api';

interface UseNewsFeedResult {
    data: NewsResponse | null;
    loading: boolean;
    error: string | null;
    page: number;
    setPage: (page: number | ((prev: number) => number)) => void;
    refetch: () => Promise<void>;
}

/**
 * Хук для работы с новостной лентой
 */
export const useNewsFeed = (
    feedType: FeedType,
    initialPage: number = 1,
    perPage: number = 3
): UseNewsFeedResult => {
    const [data, setData] = useState<NewsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(initialPage);

    const loadNews = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchNews(feedType, page, perPage);
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        } finally {
            setLoading(false);
        }
    }, [feedType, page, perPage]);

    useEffect(() => {
        loadNews();
    }, [loadNews]);

    const refetch = useCallback(async () => {
        await loadNews();
    }, [loadNews]);

    return {
        data,
        loading,
        error,
        page,
        setPage,
        refetch,
    };
};