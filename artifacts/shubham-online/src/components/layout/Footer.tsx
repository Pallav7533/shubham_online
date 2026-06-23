import { Link } from "wouter";
import { FileText, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-1.5 rounded text-white">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white">શુભમ ઓનલાઈન</span>
            </Link>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              વિદ્યાર્થીઓ, નાગરિકો અને નોકરીવાંચ્છુઓ માટે તમારું વિશ્વસનીય સ્થાનિક ઓનલાઈન સેવા કેન્દ્ર.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">ઝડપી લિંક્સ</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-slate-400 hover:text-white transition-colors">મુખ્ય પૃષ્ઠ</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">સેવાઓ</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">અમારા વિશે</Link></li>
              <li><Link href="/help" className="text-slate-400 hover:text-white transition-colors">વારંવાર પૂછાતા પ્રશ્નો</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">સેવાઓ</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">શૈક્ષણિક સેવાઓ</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">સરકારી સેવાઓ</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">નોકરી સેવાઓ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">સંપર્ક માહિતી</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-slate-400">મુખ્ય બજાર, રાજકોટ, ગુજરાત - 360001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-slate-400">+91 99999 99999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-slate-400">shubhamonline@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span className="text-slate-400">સોમ-શનિ: સવારે 9 થી સાંજે 7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} શુભમ ઓનલાઈન. સર્વાધિકાર સુરક્ષિત.
          </p>
          <div className="text-sm text-slate-600">
            <Link href="/admin" className="hover:text-slate-400 transition-colors">એડમિન પેનલ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
