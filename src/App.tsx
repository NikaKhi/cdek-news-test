import { IconNews } from '@tabler/icons-react';
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
        title: 'Бизнес',
        feedType: 'company/short',
        showCoverAlways: false,
    },
    {
        id: 'empty',
        title: 'Важные новости',
        feedType: 'company/empty',
        showCoverAlways: true,
    },
];

function App() {
    return (
        <div className="min-h-screen bg-[#F5F7FA]">
            <header className="bg-gradient-to-br from-[#1A6634] to-[#0D3B21] text-white py-6">
                <div className="max-w-[589px] mx-auto px-4">
                    <div className="flex items-center gap-2">
                        <IconNews size={24} />
                        <h1 className="text-xl font-semibold">Новостной портал СДЭК</h1>
                    </div>
                </div>
            </header>

            <main className="py-8">
                <div className="space-y-8">
                    {feeds.map((feed) => (
                        <section key={feed.id} className="bg-white rounded-2xl p-4 md:p-6 max-w-[347px] md:max-w-[589px] mx-auto shadow-sm">
                            <NewsFeed config={feed} />
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;