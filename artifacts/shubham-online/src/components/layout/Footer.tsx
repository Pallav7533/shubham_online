import { Link } from "wouter";
import { FileText, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t-4 border-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-texture opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 p-2 rounded-lg text-secondary">
                <FileText className="h-6 w-6" />
              </div>
              <span className="text-2xl font-serif font-bold text-white">શુભમ ઓનલાઈન</span>
            </Link>
            <p className="text-white/70 text-sm mb-6 leading-relaxed font-sans">
              વિદ્યાર્થીઓ, નાગરિકો અને નોકરીવાંચ્છુઓ માટે તમારું વિશ્વસનીય સ્થાનિક ઓનલાઈન સેવા કેન્દ્ર. ગુજરાતના દરેક ખૂણેથી અમારી સેવાઓનો લાભ લો.
            </p>
          </div>

          <div>
            <h3 className="text-secondary font-serif font-bold mb-6 text-xl">ઝડપી લિંક્સ</h3>
            <ul className="space-y-3 text-sm font-sans">
              <li><Link href="/" className="text-white/70 hover:text-secondary transition-colors inline-block transform hover:translate-x-1">મુખ્ય પૃષ્ઠ</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-secondary transition-colors inline-block transform hover:translate-x-1">સેવાઓ</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-secondary transition-colors inline-block transform hover:translate-x-1">અમારા વિશે</Link></li>
              <li><Link href="/help" className="text-white/70 hover:text-secondary transition-colors inline-block transform hover:translate-x-1">વારંવાર પૂછાતા પ્રશ્નો</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-secondary font-serif font-bold mb-6 text-xl">સેવાઓ</h3>
            <ul className="space-y-3 text-sm font-sans">
              <li><Link href="/services" className="text-white/70 hover:text-secondary transition-colors inline-block transform hover:translate-x-1">શૈક્ષણિક સેવાઓ</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-secondary transition-colors inline-block transform hover:translate-x-1">સરકારી સેવાઓ</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-secondary transition-colors inline-block transform hover:translate-x-1">નોકરી સેવાઓ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-secondary font-serif font-bold mb-6 text-xl">સંપર્ક માહિતી</h3>
            <ul className="space-y-4 text-sm font-sans">
              <li className="flex items-start gap-3 group">
                <div className="bg-white/5 p-2 rounded text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors">
                  <MapPin className="w-4 h-4 shrink-0" />
                </div>
                <span className="text-white/70 pt-1 leading-relaxed">મુખ્ય બજાર, રાજકોટ, ગુજરાત - 360001</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-white/5 p-2 rounded text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />
                </div>
                <span className="text-white/70">+91 99999 99999</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-white/5 p-2 rounded text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 shrink-0" />
                </div>
                <span className="text-white/70">shubhamonline@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-white/5 p-2 rounded text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors">
                  <Clock className="w-4 h-4 shrink-0" />
                </div>
                <span className="text-white/70">સોમ-શનિ: સવારે 9 થી સાંજે 7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50 font-sans">
            &copy; {new Date().getFullYear()} શુભમ ઓનલાઈન. સર્વાધિકાર સુરક્ષિત.
          </p>
          <div className="text-sm font-sans">
            <Link href="/admin" className="text-white/50 hover:text-secondary transition-colors px-4 py-2 rounded-full hover:bg-white/5">એડમિન પેનલ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}