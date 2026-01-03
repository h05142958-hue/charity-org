import { Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import Counter from '../components/ui/Counter';
import { orphanProject, donationProjects, statistics, teamMembers, values, activities, news } from '../data/mockData';
import { Building, Users, Briefcase } from 'lucide-react';

export default function Home() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const visibleCards = 3;
  const maxIndex = Math.max(0, donationProjects.length - visibleCards);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setProjectIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const interval = setInterval(() => {
      if (!isDragging) {
        slider.scrollLeft += 1;
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
          slider.scrollLeft = 0;
        }
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      building: <Building size={40} />,
      users: <Users size={40} />,
      briefcase: <Briefcase size={40} />,
      heart: <Heart size={40} />,
    };
    return icons[iconName] || <Heart size={40} />;
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ar-SA');
  };

  return (
    <main className="bg-white" dir="rtl">
      <section className="relative bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-right space-y-6 order-2 md:order-1 relative z-10">
              <div className="flex items-center justify-center md:justify-end gap-2 mb-4">
                <span className="text-yellow-400 text-sm font-medium">نبدأ بمشروع ثلاثمائي المحتاجين</span>
                <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
                  <span className="text-xl">🌱</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                نحن منظمة <br />
                <span className="text-yellow-400">خيرية غير ربحية</span>
                <br />
                <span className="text-yellow-400">عالمية</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto md:mr-0">
                نريد منحة تغيير وبناء مستقبل النشء الطيب لكل طفل، لكل جريح من المحتاجين المشردين باختلاف
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end pt-4">
                <Button variant="primary" size="lg" className="gap-2">
                  <Heart size={20} />
                  <span>تبرّع الآن</span>
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <MessageCircle size={20} />
                  <span>طلب استشارة</span>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 h-48">
                    <img src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=400" alt="مساعدات" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 h-64">
                    <img src="https://images.pexels.com/photos/6646895/pexels-photo-6646895.jpeg?auto=compress&cs=tinysrgb&w=400" alt="أطفال" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 h-64">
                    <img src="https://images.pexels.com/photos/6995220/pexels-photo-6995220.jpeg?auto=compress&cs=tinysrgb&w=400" alt="مساعدات إنسانية" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 h-48">
                    <img src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400" alt="غذاء" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {orphanProject.title}
              </h2>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <ProgressBar percentage={orphanProject.percentage} />
                <div className="absolute -top-8 right-0 bg-teal-700 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  {orphanProject.percentage}%
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">المبلغ المحقق</p>
                  <p className="text-3xl font-bold text-teal-700">{formatCurrency(orphanProject.currentAmount)}</p>
                  <p className="text-gray-500 text-sm mt-1">درهم</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">المبلغ المطلوب</p>
                  <p className="text-3xl font-bold text-gray-800">{formatCurrency(orphanProject.targetAmount)}</p>
                  <p className="text-gray-500 text-sm mt-1">درهم</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-teal-700 font-medium">نبدأ بدعم المحتاجين</span>
              <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
                <span className="text-xl">🌱</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              كن <span className="text-yellow-500">عونًا</span> لهم في أوقات المحن
            </h2>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(${projectIndex * (100 / visibleCards)}%)` }}
              >
                {donationProjects.map((project) => (
                  <div
                    key={project.id}
                    className="min-w-[calc(100%-2rem)] md:min-w-[calc(33.333%-1rem)] bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative">
                      <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          {project.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 text-right">{project.title}</h3>
                      <p className="text-gray-600 text-sm text-right mb-6 line-clamp-3">{project.description}</p>
                      <Button variant="secondary" size="md" className="w-full gap-2">
                        <Heart size={18} />
                        <span>تبرّع الآن</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                setProjectIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronRight size={24} />
            </button>
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                setProjectIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gray-900 via-teal-900 to-gray-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/6646981/pexels-photo-6646981.jpeg?auto=compress&cs=tinysrgb&w=1200)',
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">الإحصائيات</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white shadow-2xl">
                    {getIcon(stat.icon)}
                  </div>
                </div>
                <div className="text-white mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-300 text-sm md:text-base font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              فريقنا المتفاني في <span className="text-yellow-500">خدمة</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-teal-900/50 to-transparent z-10"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 right-0 left-0 p-6 z-20 text-white">
                    <h3 className="text-2xl font-bold mb-2 text-right">{member.name}</h3>
                    <p className="text-teal-100 text-sm text-right">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant="primary" size="lg">
              مزيد عن فريقنا
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              مساعدة بعضنا البعض يمكن أن
              <br />
              تجعل <span className="text-yellow-500">العالم</span> أفضل
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {values.map((value) => (
              <div
                key={value.id}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {getIcon(value.icon)}
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 mb-12">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              البركة في <span className="text-yellow-500">صور</span>
            </h2>
          </div>
        </div>
        <div
          ref={sliderRef}
          className={`flex gap-6 overflow-x-auto scrollbar-hide px-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {[...activities, ...activities].map((activity, index) => (
            <div
              key={`${activity.id}-${index}`}
              className="flex-shrink-0 w-96 group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-0 right-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold text-right">{activity.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              تتبّع <span className="text-yellow-500">جديد</span> البركة الجزائرية
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {news.slice(0, 3).map((newsItem, index) => (
              <div
                key={index}
                className={`group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
                  index === 0 ? 'md:col-span-1 md:row-span-2 h-[500px]' : 'h-[240px]'
                }`}
              >
                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                <div className="absolute bottom-0 right-0 left-0 p-6 text-white">
                  <h3 className={`${index === 0 ? 'text-2xl' : 'text-lg'} font-bold text-right leading-tight`}>
                    {newsItem.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="primary" size="lg">
              جميع الأخبار
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
