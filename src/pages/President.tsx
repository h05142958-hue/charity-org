import { Check } from 'lucide-react';
import Button from '../components/ui/Button';
import { presidentData } from '../data/mockData';

export default function President() {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">رئيس الجمعية</h1>
          <p className="text-xl text-gray-300">كلمة القيادة والرؤية</p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div className="text-right">
              <div className="flex items-center gap-3 mb-4 justify-end">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{presidentData.name}</h2>
                  <p className="text-teal-700 font-semibold text-lg">{presidentData.title}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-right">الإنجازات الرئيسية</h3>
                <ul className="space-y-3">
                  {presidentData.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300"
                    >
                      <Check size={24} className="text-teal-700 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 group-hover:text-teal-700 transition-colors">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="primary" size="lg">
                تبرّع الآن
              </Button>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96 md:h-[500px]">
                <img
                  src={presidentData.image}
                  alt={presidentData.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 right-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold text-right">{presidentData.name}</h3>
                  <p className="text-yellow-400 font-semibold text-right">{presidentData.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">كلمة الرئيس</h2>
            <div className="bg-gradient-to-br from-gray-50 to-yellow-50 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
              <div className="prose prose-lg max-w-none text-right">
                {presidentData.message.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-block bg-gradient-to-r from-teal-700 to-teal-600 text-white px-8 py-6 rounded-2xl shadow-lg">
                <p className="text-sm text-teal-100 mb-2">التوقيع الرسمي</p>
                <p className="text-2xl font-bold">{presidentData.name}</p>
                <p className="text-teal-100 font-semibold">{presidentData.title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-teal-700 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">تحت قيادة الشيخ أحمد إبراهيمي</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            تطورت جمعية البركة الخيرية لتصبح منظمة إنسانية رائدة، تعمل بشفافية وكفاءة عالية لخدمة المحتاجين حول العالم
          </p>
          <Button variant="outline" size="lg">
            اعرف المزيد عن الجمعية
          </Button>
        </div>
      </section>
    </div>
  );
}
