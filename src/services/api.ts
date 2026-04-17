import { NewsResponse, FeedType } from '../types/news';

const BASE_URL = '/api/v1/news/feed';

interface CacheEntry {
    data: NewsResponse;
    timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000;

export const fetchNews = async (
    feed: FeedType,
    page: number = 1,
    perPage: number = 3
): Promise<NewsResponse> => {
    const cacheKey = `${feed}_${perPage}_${page}`;

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
        cache.set(cacheKey, { data, timestamp: Date.now() });

        return data;
    } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
        throw error;
    }
};

export const clearCache = (): void => {
    cache.clear();
    console.log('[Cache] Cleared');
};