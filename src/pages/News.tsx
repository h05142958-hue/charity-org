import { useState, useEffect } from 'react';
import { Search, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  created_at: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const newsPerPage = 4;

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    filterNews();
  }, [news, searchQuery]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const newsData = data || [];
      setNews(newsData);
      setRecentNews(newsData.slice(0, 3));
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterNews = () => {
    let filtered = [...news];

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNews(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `منذ ${diffDays} أيام`;
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-900 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-yellow-400 text-sm font-medium">تعرف على جديد الجمعية</span>
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-xl">📰</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">آخر الأخبار</h1>
          <p className="text-xl text-gray-300">تابع آخر أخبار وأنشطة جمعية البركة الخيرية</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-right">ابحث هنا</h3>
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search for posts"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-lg text-right focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 text-right">آخر الأخبار</h3>
                  <div className="space-y-4">
                    {recentNews.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 group cursor-pointer">
                        <div className="flex-1 text-right">
                          <h4 className="text-sm font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors line-clamp-2 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500">{formatDate(item.created_at)}</p>
                        </div>
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600 mt-4">جاري التحميل...</p>
                </div>
              ) : currentNews.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-400" size={40} />
                  </div>
                  <p className="text-xl text-gray-600">لا توجد أخبار مطابقة للبحث</p>
                </div>
              ) : (
                <>
                  <div className="space-y-6 mb-8">
                    {currentNews.map((item) => (
                      <article
                        key={item.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="grid md:grid-cols-5 gap-6">
                          <div className="md:col-span-2 relative h-64 md:h-auto">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4">
                              <span className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                جديد
                              </span>
                            </div>
                          </div>
                          <div className="md:col-span-3 p-6 md:p-8 text-right flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-4 mb-4 flex-wrap justify-end">
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                  <span>{item.author}</span>
                                  <User size={16} className="text-yellow-600" />
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                  <span>{formatDate(item.created_at)}</span>
                                  <Calendar size={16} className="text-yellow-600" />
                                </div>
                              </div>
                              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight hover:text-yellow-600 transition-colors cursor-pointer">
                                {item.title}
                              </h2>
                              <p className="text-gray-600 text-base leading-relaxed mb-6">
                                {item.excerpt}
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <Button variant="secondary" size="sm" className="gap-2">
                                <span>قراءة المزيد</span>
                                <ChevronLeft size={18} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:border-yellow-500 hover:bg-yellow-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} className="text-gray-700" />
                      </button>

                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-lg font-bold transition-all ${
                              currentPage === page
                                ? 'bg-yellow-500 text-white shadow-lg'
                                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-yellow-500 hover:bg-yellow-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:border-yellow-500 hover:bg-yellow-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} className="text-gray-700" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">كن جزءاً من التغيير</h2>
          <p className="text-xl text-gray-900 mb-8 max-w-2xl mx-auto">
            انضم إلينا في رحلتنا لمساعدة المحتاجين وتحسين حياتهم
          </p>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-yellow-600">
            تبرع الآن
          </Button>
        </div>
      </section>
    </div>
  );
}
