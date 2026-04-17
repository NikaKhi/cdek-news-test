import { IconBrandReact, IconDatabase, IconDeviceMobile, IconNews } from '@tabler/icons-react';
import { NewsFeed } from './components/NewsFeed';
import { NewsFeedConfig } from './types/news';

const feeds: NewsFeedConfig[] = [
    {
        id: 'company-news',
        title: 'Новости компании',
        feedType: 'company/short',
        showCoverAlways: true,
    },
    {
        id: 'business',
        title: 'Рубрика Бизнес',
        feedType: 'company/short',
        showCoverAlways: false,
    },
    {
        id: 'empty',
        title: 'Архив (пустая рубрика)',
        feedType: 'company/empty',
        showCoverAlways: true,
    },
];

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gradient-to-br from-[#1A6634] to-[#0D3B21] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                            <IconNews size={28} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Новостной портал</h1>
                            <p className="text-green-200 text-sm md:text-base">СДЭК</p>
                        </div>
                    </div>

                    <p className="text-green-100 max-w-2xl text-sm md:text-base opacity-90">
                        Актуальные новости, анонсы и события из жизни компании
                    </p>

                    <div className="flex flex-wrap gap-4 md:gap-6 mt-6 text-xs md:text-sm text-green-100">
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                            <IconBrandReact size={16} />
                            <span>React + TypeScript</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                            <IconDatabase size={16} />
                            <span>Кэширование</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                            <IconDeviceMobile size={16} />
                            <span>Адаптивность</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 py-8 md:py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8 md:space-y-12">
                        {feeds.map((feed) => (
                            <section key={feed.id}>
                                <NewsFeed config={feed} />
                            </section>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        Тестовое задание для стажировки Frontend-разработчик СДЭК
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;