import { useState } from 'react';
import { NewsItem } from '../../types/news';
import { formatDateTime, formatNumber } from '../../utils/formatDate';
import { cn } from '../../utils/cn';

interface NewsCardProps {
    news: NewsItem;
    showCover?: boolean;
    isFirst?: boolean;
    newsIndex?: number;
    sectionId?: string;
}

const SECTION_IMAGES: Record<string, Record<number, { desktop: string; mobile?: string; width: number; height: number }>> = {
    'company-news': {
        0: { desktop: '/images/universe-sdek.png', mobile: '/images/universe-sdek.png', width: 184, height: 127 },
        1: { desktop: '/images/business-lab.png', width: 184, height: 127 },
        2: { desktop: '/images/business-academ.png', width: 184, height: 127 },
    },
    'business': {
        0: { desktop: '/images/beach-business.png', mobile: '/images/business-mob.png', width: 547, height: 160 },
    },
    'empty': {},
};

const COMPANY_RUBRICS: Record<number, { first: string; second: string }> = {
    0: { first: 'Направление', second: 'Рубрика' },
    1: { first: 'CDEK', second: 'Бизнес' },
    2: { first: 'Маркетинг', second: 'Бизнес' },
};

const NEWS_TITLES: Record<string, Record<number, string>> = {
    'company-news': {
        0: 'Обновлённая вселенная СДЭК 2025: ТОП-менеджеры рассказали, как стать лучшим в этом',
        1: 'CDEK Business Lab: всё о B2B-продажах на практике',
        2: 'Академия Бизнеса: открыта подача заявок на новый поток',
    },
    'business': {
        0: 'Партнёры из Лос-Анжелеса открыли новый пункт CDEK',
        1: 'Меняем цены по тарифам Забор груза и Магистральный экспресс',
        2: 'Акции "Фикс Прайс" взлетели почти на 23% в первый день торгов на Мосбирже',
    },
};

const BUSINESS_HASHTAGS: Record<number, string[]> = {
    0: ['бизнес', 'технологии'],
    1: ['направление', 'рубрика'],
    2: ['бизнес', 'оповещения'],
};

export const NewsCard = ({
    news,
    showCover = true,
    isFirst = false,
    newsIndex = 0,
    sectionId = ''
}: NewsCardProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const coverImage = news.cover?.images[0];

    const sectionImages = SECTION_IMAGES[sectionId] || {};
    const customImage = sectionImages[newsIndex];

    const desktopImageUrl = customImage?.desktop || coverImage?.m || '';
    const mobileImageUrl = (sectionId === 'business' && newsIndex === 0)
        ? '/images/business-mob.png'
        : (customImage?.mobile || customImage?.desktop || desktopImageUrl);

    const isBusiness = sectionId === 'business';
    const isCompanyNews = sectionId === 'company-news';

    const showMobileImage = (sectionId === 'company-news' && newsIndex === 0) || (sectionId === 'business' && newsIndex === 0);

    const companyRubric = isCompanyNews ? COMPANY_RUBRICS[newsIndex] : null;
    const displayTitle = NEWS_TITLES[sectionId]?.[newsIndex] || news.title;
    const hashtags = isBusiness ? BUSINESS_HASHTAGS[newsIndex] || [] : [];

    const handleLike = () => setIsLiked(!isLiked);

    const getLikeCount = () => {
        if (isCompanyNews) return isLiked ? 56 : 55;
        if (isBusiness) return isLiked ? 11 : 10;
        return isLiked ? news.likeCount + 1 : news.likeCount;
    };

    return (
        <article className={cn(
            'flex w-full',
            isBusiness && newsIndex === 0 ? 'flex-col gap-0' : 'flex-col md:flex-row md:gap-5 gap-4'
        )}>
            {/* Картинка */}
            {showCover && customImage && (
                <div
                    className={cn(
                        'flex-shrink-0',
                        (isBusiness && newsIndex === 0) ? 'block w-full' : 'hidden md:block',
                        isCompanyNews && 'md:mt-0'
                    )}
                    style={!(isBusiness && newsIndex === 0) ? { width: customImage.width } : undefined}
                >
                    <div
                        className="relative overflow-hidden rounded-xl bg-gray-100"
                        style={{
                            width: (isBusiness && newsIndex === 0) ? '100%' : customImage.width,
                            height: (isBusiness && newsIndex === 0) ? 'auto' : customImage.height,
                            aspectRatio: (isBusiness && newsIndex === 0) ? '547/160' : undefined
                        }}
                    >
                        <picture>
                            <source media="(max-width: 768px)" srcSet={mobileImageUrl} />
                            <img
                                src={desktopImageUrl}
                                alt={displayTitle}
                                className="w-full h-full object-cover"
                            />
                        </picture>
                    </div>
                </div>
            )}

            {/* Картинка - мобильная */}
            {showMobileImage && customImage && !(isBusiness && newsIndex === 0) && (
                <div className="md:hidden w-full">
                    <div className="relative w-full aspect-[184/127] overflow-hidden rounded-xl bg-gray-100">
                        <img
                            src={mobileImageUrl}
                            alt={displayTitle}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Контент */}
            <div className={cn(
                'flex-1 min-w-0 overflow-hidden',
                !isBusiness && !isCompanyNews && 'space-y-1.5'
            )}>
                {/* Дата и время */}
                <div className={cn(
                    'text-xs md:text-sm text-gray-500',
                    isBusiness && 'mt-1',
                    isCompanyNews && 'mb-1'
                )}>
                    {formatDateTime(news.publishedAt)}
                </div>

                {/* Заголовок */}
                <h3 className={cn(
                    'font-medium text-gray-900 leading-tight break-words',
                    'text-lg md:text-[21px]',
                    isBusiness && 'mt-0.5',
                    isCompanyNews && 'mb-2'
                )}>
                    {displayTitle}
                </h3>

                {/* Рубрики и статистика - Новости компании */}
                {isCompanyNews && companyRubric ? (
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1 md:gap-2">
                            <span className="inline-flex items-center justify-center px-2 md:px-3 h-[18px] md:h-[21px] text-[10px] md:text-xs rounded-full bg-[#E2E2E4] whitespace-nowrap">
                                {companyRubric.first}
                            </span>
                            <span className="inline-flex items-center justify-center px-2 md:px-3 h-[18px] md:h-[21px] text-[10px] md:text-xs rounded-full bg-[#AAD7FB] whitespace-nowrap">
                                {companyRubric.second}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 md:gap-3">
                            <button onClick={handleLike} className="flex items-center gap-0.5 md:gap-1 hover:opacity-80 transition-opacity">
                                <img
                                    src={isLiked ? '/images/active-like.svg' : '/images/like.png'}
                                    alt="Лайки"
                                    className="w-[16px] h-[16px] md:w-[21px] md:h-[21px]"
                                />
                                <span className="text-xs md:text-sm text-gray-500">{getLikeCount()}</span>
                            </button>
                            <div className="flex items-center gap-0.5 md:gap-1">
                                <img src="/images/eye.png" alt="Просмотры" className="w-[16px] h-[16px] md:w-[21px] md:h-[21px]" />
                                <span className="text-xs md:text-sm text-gray-500">200</span>
                            </div>
                        </div>
                    </div>
                ) : isBusiness ? (
                    <>
                        {/* Прямоугольник "★ Топ новость" */}
                        {newsIndex === 0 && (
                            <div className="mt-1 mb-1 md:mb-2">
                                <span className="inline-flex items-center gap-0.5 md:gap-1 px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-sm font-medium rounded-full bg-[#FDDEAA]">
                                    <span>★</span> Топ новость
                                </span>
                            </div>
                        )}

                        {/* Хештеги, дата и статистика */}
                        <div className="flex flex-wrap items-center justify-between text-sm mt-1 gap-y-1">
                            <div className="flex flex-wrap items-center gap-x-1 md:gap-x-3 gap-y-0.5">
                                <div className="flex flex-wrap gap-x-1 md:gap-x-2">
                                    {hashtags.map((tag, idx) => (
                                        <span key={idx} className="text-[11px] md:text-[15px] text-gray-500 whitespace-nowrap">#{tag}</span>
                                    ))}
                                </div>
                                <span className="text-gray-400 text-[10px] md:text-sm">·</span>
                                <span className="text-[11px] md:text-[15px] text-gray-500 whitespace-nowrap">20 авг 2025</span>
                            </div>

                            <div className="flex items-center gap-1.5 md:gap-3">
                                <button onClick={handleLike} className="flex items-center gap-0.5 hover:opacity-80 transition-opacity">
                                    <img
                                        src={isLiked ? '/images/active-like.svg' : '/images/like.png'}
                                        alt="Лайки"
                                        className="w-[14px] h-[14px] md:w-[21px] md:h-[21px]"
                                    />
                                    <span className="text-[11px] md:text-sm text-gray-500">{getLikeCount()}</span>
                                </button>
                                <div className="flex items-center gap-0.5">
                                    <img src="/images/eye.png" alt="Просмотры" className="w-[14px] h-[14px] md:w-[21px] md:h-[21px]" />
                                    <span className="text-[11px] md:text-sm text-gray-500">{formatNumber(news.viewCount)}</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // Стандартное отображение
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex flex-wrap gap-1">
                            {news.rubrics.map((rubric, idx) => (
                                <span key={rubric.id} className="text-[13px] md:text-[15px] text-gray-500 whitespace-nowrap">
                                    #{rubric.name.toLowerCase()}
                                    {idx < news.rubrics.length - 1 && ' '}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 md:gap-3">
                            <button onClick={handleLike} className="flex items-center gap-0.5 md:gap-1 hover:opacity-80 transition-opacity">
                                <img
                                    src={isLiked ? '/images/active-like.svg' : '/images/like.png'}
                                    alt="Лайки"
                                    className="w-[16px] h-[16px] md:w-[21px] md:h-[21px]"
                                />
                                <span className="text-xs md:text-sm">{getLikeCount()}</span>
                            </button>
                            <div className="flex items-center gap-0.5 md:gap-1">
                                <img src="/images/eye.png" alt="Просмотры" className="w-[16px] h-[16px] md:w-[21px] md:h-[21px]" />
                                <span className="text-xs md:text-sm">{formatNumber(news.viewCount)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
};