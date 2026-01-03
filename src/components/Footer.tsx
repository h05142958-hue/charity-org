import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="text-right">
            <div className="flex items-center gap-3 mb-6 justify-end">
              <div>
                <h3 className="text-xl font-bold text-yellow-400">جمعية البركة الخيرية</h3>
                <p className="text-sm text-gray-400">للعمل الإنساني والإغاثة</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-teal-700 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              منظمة خيرية غير ربحية عالمية تسعى لتحسين حياة المحتاجين حول العالم من خلال مشاريع إنسانية مستدامة
            </p>
          </div>

          <div className="text-right">
            <h4 className="text-lg font-bold mb-6 text-yellow-400">الشبكة الخيرية</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center justify-end gap-2">
                  <span>من نحن</span>
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center justify-end gap-2">
                  <span>مشاريعنا الإنسانية</span>
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center justify-end gap-2">
                  <span>تقارير الأداء والشفافية</span>
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center justify-end gap-2">
                  <span>التطوّع معنا</span>
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                </a>
              </li>
            </ul>
          </div>

          <div className="text-right">
            <h4 className="text-lg font-bold mb-6 text-yellow-400">تواصل معنا</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+213797469531" className="text-gray-400 hover:text-white transition-colors flex items-center justify-end gap-3">
                  <span className="text-sm">+213-797-469-31</span>
                  <Phone size={18} className="text-teal-500" />
                </a>
              </li>
              <li>
                <a href="mailto:contact@albaraka-dz.com" className="text-gray-400 hover:text-white transition-colors flex items-center justify-end gap-3">
                  <span className="text-sm">contact@albaraka-dz.com</span>
                  <Mail size={18} className="text-teal-500" />
                </a>
              </li>
              <li>
                <div className="text-gray-400 flex items-start justify-end gap-3">
                  <span className="text-sm">الجزائر العاصمة، الجزائر</span>
                  <MapPin size={18} className="text-teal-500 flex-shrink-0" />
                </div>
              </li>
            </ul>
          </div>

          <div className="text-right">
            <h4 className="text-lg font-bold mb-6 text-yellow-400">أرسل لنا رسالة !</h4>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-right text-sm focus:outline-none focus:border-teal-500 transition-colors"
              />
              <textarea
                placeholder="رسالتك"
                rows={3}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-right text-sm focus:outline-none focus:border-teal-500 transition-colors resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
              >
                <Send size={18} />
                <span>إرسال</span>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-teal-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-teal-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-teal-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-teal-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Youtube size={20} />
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                جميع الحقوق محفوظة لجمعية البركة الخيرية الجزائرية © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
