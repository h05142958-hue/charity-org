import { Heart, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';
import Counter from '../components/ui/Counter';
import { aboutData } from '../data/mockData';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-yellow-400 text-sm font-medium">منصة تعريفية</span>
            <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
              <span className="text-xl">🌱</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">من نحن</h1>
          <p className="text-xl text-gray-300">تعرف على رحلتنا وإنجازاتنا</p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <img
                src="https://images.pexels.com/photos/6995239/pexels-photo-6995239.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="عن الجمعية"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
            <div className="order-1 md:order-2 text-right">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-teal-700 font-medium">منصة تعريفية</span>
                <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
                  <span className="text-xl">🌱</span>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                البركة نحو <span className="text-yellow-500">الخير</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {aboutData.description}
              </p>
              <div className="bg-yellow-50 border-r-4 border-yellow-400 p-6 rounded-lg mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="text-red-500" size={24} />
                  <h3 className="text-xl font-bold text-gray-800">تأسيسنا</h3>
                </div>
                <p className="text-gray-700 font-semibold text-lg">{aboutData.foundedDate}</p>
              </div>
              <Button variant="primary" size="lg">
                تبرّع الآن
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {aboutData.achievements.map((achievement, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white shadow-lg">
                      <TrendingUp size={24} />
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">أرقام نجاحنا</h2>
            <p className="text-xl text-gray-300">إحصائيات تعكس التزامنا برسالتنا</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aboutData.stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform hover:scale-110 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white shadow-2xl">
                    <Counter target={stat.value} suffix={stat.suffix} duration={1500} />
                  </div>
                </div>
                <p className="text-gray-300 text-sm md:text-base font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-teal-50 to-yellow-50 border-2 border-teal-200 rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6 justify-end">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">لماذا نحن ؟</h2>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white">
                  <Heart size={24} />
                </div>
              </div>
              <p className="text-right text-gray-700 text-lg leading-relaxed mb-6">
                نؤمن بأن كل إنسان يستحق العيش بكرامة وأمان. رسالتنا أن نقدم المساعدة الإنسانية بشفافية وكفاءة عالية، مع التركيز على الحلول المستدامة التي تغير حياة الناس للأفضل.
              </p>
              <div className="flex justify-end">
                <Button variant="primary" size="lg">
                  المزيد عننا
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
