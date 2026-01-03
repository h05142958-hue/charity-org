import { useState, useEffect } from 'react';
import { Search, MapPin, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  funding_status: string;
  target_amount: number;
  current_amount: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const projectsPerPage = 4;

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchQuery, selectedCategory, selectedLocation]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = [...projects];

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((project) => project.category === selectedCategory);
    }

    if (selectedLocation) {
      filtered = filtered.filter((project) => project.location === selectedLocation);
    }

    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const categories = ['إغاثي', 'تعليمي', 'صحي', 'تنموي', 'كفالة', 'موسمي', 'منفذ'];
  const locations = ['فلسطين', 'سوريا', 'اليمن', 'الصومال', 'الجزائر'];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-yellow-400 text-sm font-medium">مشاريع تنمية مستدامة متجددة</span>
            <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
              <span className="text-xl">🌱</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">مشاريعنا</h1>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              بكل مشروع نحي <span className="text-yellow-500">أملاً</span> جديد
            </h2>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-right">Search Here</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Here"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-lg text-right focus:outline-none focus:border-teal-500 transition-colors"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-right">الفئة</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-right px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === null
                        ? 'bg-yellow-400 text-gray-900 font-bold'
                        : 'bg-white hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    الكل
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-right px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-yellow-400 text-gray-900 font-bold'
                          : 'bg-white hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-right">المكان</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className={`w-full text-right px-4 py-2 rounded-lg transition-colors ${
                      selectedLocation === null
                        ? 'bg-yellow-400 text-gray-900 font-bold'
                        : 'bg-white hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    الكل
                  </button>
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`w-full text-right px-4 py-2 rounded-lg transition-colors ${
                        selectedLocation === location
                          ? 'bg-yellow-400 text-gray-900 font-bold'
                          : 'bg-white hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block w-12 h-12 border-4 border-teal-700 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600 mt-4">جاري التحميل...</p>
                </div>
              ) : currentProjects.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-400" size={40} />
                  </div>
                  <p className="text-xl text-gray-600">لا توجد مشاريع مطابقة للبحث</p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {currentProjects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                      >
                        <div className="relative">
                          <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
                          <div className="absolute top-4 right-4">
                            <span className="bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              {project.funding_status}
                            </span>
                          </div>
                          <div className="absolute top-4 left-4">
                            <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              شروع
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3 justify-end text-gray-600 text-sm">
                            <span>{project.location}</span>
                            <MapPin size={16} className="text-teal-700" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-3 text-right">{project.title}</h3>
                          <p className="text-gray-600 text-sm text-right mb-4 line-clamp-2">{project.description}</p>
                          <Button variant="secondary" size="sm" className="w-full gap-2">
                            قراءة المزيد
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:border-yellow-400 hover:bg-yellow-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronsRight size={20} className="text-gray-700" />
                      </button>

                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:border-yellow-400 hover:bg-yellow-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} className="text-gray-700" />
                      </button>

                      {getPageNumbers().map((page, index) =>
                        page === '...' ? (
                          <span key={`dots-${index}`} className="px-2 text-gray-400">
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page as number)}
                            className={`w-10 h-10 rounded-lg font-bold transition-all ${
                              currentPage === page
                                ? 'bg-yellow-400 text-gray-900 shadow-lg'
                                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-yellow-400 hover:bg-yellow-50'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:border-yellow-400 hover:bg-yellow-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} className="text-gray-700" />
                      </button>

                      <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center hover:border-yellow-400 hover:bg-yellow-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronsLeft size={20} className="text-gray-700" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
