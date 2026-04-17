export interface NewsImage {
    s: string;
    m: string;
    l: string;
    hd: string;
}

export interface Cover {
    type: 'gallery' | 'single';
    images: NewsImage[];
}

export interface Rubric {
    id: number;
    slug: string;
    name: string;
}

export interface NewsItem {
    id: string;
    title: string;
    cover: Cover | null;
    likeCount: number;
    viewCount: number;
    publishedAt: string;
    rubrics: Rubric[];
}

export interface NewsResponse {
    totalPages: number;
    perPage: number;
    news: NewsItem[];
    minDatePublication: string;
}

export type FeedType = 'company/short' | 'company/empty';

export interface NewsFeedConfig {
    id: string;
    title: string;
    feedType: FeedType;
    showCoverAlways?: boolean;
}