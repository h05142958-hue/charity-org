import { Phone, Mail, MapPin, Heart, Globe, Users, Shield, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import { contactData } from '../data/mockData';

export default function Contact() {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      heart: <Heart size={32} />,
      globe: <Globe size={32} />,
      users: <Users size={32} />,
      shield: <Shield size={32} />,
    };
    return icons[iconName] || <Heart size={32} />;
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-yellow-400 text-sm font-medium">منصة تواصل</span>
            <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
              <span className="text-xl">🌱</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">اتصل بنا</h1>
          <p className="text-xl text-gray-300">نحن هنا لمساعدتك والإجابة على استفساراتك</p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-2 mb-4 justify-end">
                <span className="text-teal-700 font-medium">منصة توصلك</span>
                <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
                  <span className="text-xl">🌱</span>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6 text-right">
                من <span className="text-yellow-500">نحن</span> هنا و بماذا نعرف أنفسنا
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed text-right">
                {contactData.description}
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4">
                    <Phone className="text-teal-700" size={24} />
                    <div className="text-right flex-1">
                      <p className="text-gray-600 text-sm">رقم الهاتف</p>
                      <a href="tel:+213797469531" className="text-xl font-bold text-gray-800 hover:text-teal-700 transition-colors">
                        {contactData.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4">
                    <Mail className="text-teal-700" size={24} />
                    <div className="text-right flex-1">
                      <p className="text-gray-600 text-sm">البريد الإلكتروني</p>
                      <a href="mailto:contact@albaraka-dz.com" className="text-xl font-bold text-gray-800 hover:text-teal-700 transition-colors">
                        {contactData.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4">
                    <MapPin className="text-teal-700" size={24} />
                    <div className="text-right flex-1">
                      <p className="text-gray-600 text-sm">العنوان</p>
                      <p className="text-xl font-bold text-gray-800">{contactData.address}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border-r-4 border-yellow-400">
                  <p className="text-gray-800 font-semibold">ساعات العمل</p>
                  <p className="text-gray-700 mt-2">{contactData.workingHours}</p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <img
                src="https://images.pexels.com/photos/6995239/pexels-photo-6995239.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="اتصل بنا"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {contactData.features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {getIcon(feature.icon)}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-teal-700 to-teal-600 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/6995220/pexels-photo-6995220.jpeg?auto=compress&cs=tinysrgb&w=1200)',
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-sm font-medium">شكل الاتصال</span>
                <Send size={20} className="text-yellow-400" />
              </div>
              <h2 className="text-4xl font-bold mb-6">أرسل لنا رسالة لدعم أنشطتنا الخيرية !</h2>
              <p className="text-teal-100 text-lg mb-8">
                نود أن نسمع منك. أرسل لنا استفساراتك أو طلباتك أو آرائك، وسنقوم بالرد عليك في أقرب وقت ممكن.
              </p>
            </div>

            <form className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-right">الاسم الكامل</label>
                <input
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-right text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-right">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-right text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-right">رقم الهاتف</label>
                <input
                  type="tel"
                  placeholder="رقم هاتفك"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-right text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-right">الموضوع</label>
                <input
                  type="text"
                  placeholder="موضوع رسالتك"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-right text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-right">الرسالة</label>
                <textarea
                  placeholder="اكتب رسالتك هنا"
                  rows={5}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-right text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                ></textarea>
              </div>

              <Button variant="primary" size="lg" className="w-full gap-2">
                <Send size={20} />
                <span>إرسال الرسالة</span>
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
