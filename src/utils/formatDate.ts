/**
 * Форматирует дату в формат "20 августа 2025"
 */
export const formatFullDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

/**
 * Форматирует дату и время в формат "20 августа 16:30"
 */
export const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('ru-RU', { month: 'long' });
    const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    return `${day} ${month} ${time}`;
};

/**
 * Форматирует месяц и год "Август, 2025"
 */
export const formatMonthYear = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
};

/**
 * Форматирует день недели и дату "Среда, 20 августа"
 */
export const formatWeekdayDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
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