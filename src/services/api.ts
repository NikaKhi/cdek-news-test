import { NewsResponse, FeedType } from '../types/news';

const BASE_URL = 'http://1e14c3489fcb.vps.myjino.ru:5000/api/v1/news/feed';

interface CacheEntry {
    data: NewsResponse;
    timestamp: number;
}

// Кэш в памяти
const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 минут

/**
 * Загружает новости с кэшированием
 */
export const fetchNews = async (
    feed: FeedType,
    page: number = 1,
    perPage: number = 3
): Promise<NewsResponse> => {
    const cacheKey = `${feed}_${perPage}_${page}`;

    // Проверяем кэш
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log(`[Cache] Hit: ${cacheKey}`);
        return cached.data;
    }

    console.log(`[API] Fetching: ${cacheKey}`);

    const url = `${BASE_URL}/${feed}?perPage=${perPage}&page=${page}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }

        const data: NewsResponse = await response.json();

        // Сохраняем в кэш
        cache.set(cacheKey, { data, timestamp: Date.now() });

        return data;
    } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
        throw error;
    }
};

/**
 * Очищает кэш (можно использовать при forced refresh)
 */
export const clearCache = (): void => {
    cache.clear();
    console.log('[Cache] Cleared');
};