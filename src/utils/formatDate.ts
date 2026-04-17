/**
 * Форматирует дату в человекочитаемый вид
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Сегодня
    if (diffDays === 0) {
        return 'Сегодня';
    }

    // Вчера
    if (diffDays === 1) {
        return 'Вчера';
    }

    // В течение недели
    if (diffDays < 7) {
        return `${diffDays} ${getDayWord(diffDays)} назад`;
    }

    // Более недели - полная дата
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
};

/**
 * Возвращает правильное склонение слова "день"
 */
const getDayWord = (days: number): string => {
    const lastDigit = days % 10;
    const lastTwoDigits = days % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'дней';
    }

    if (lastDigit === 1) {
        return 'день';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'дня';
    }

    return 'дней';
};

/**
 * Форматирует число в сокращенный вид (1.5K, 2.3M)
 */
export const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
};