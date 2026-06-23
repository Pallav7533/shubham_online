import ClientLayout from "@/components/layout/ClientLayout";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <ClientLayout>
      <div className="bg-slate-50 py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">અમારા વિશે</h1>
            <p className="text-lg text-slate-600">
              શુભમ ઓનલાઈન — તમારો ડિજિટલ સાથી.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl prose prose-lg prose-slate">
          <p className="lead text-xl text-slate-700 font-medium mb-8">
            શુભમ ઓનલાઈન છેલ્લા 5 વર્ષથી વિદ્યાર્થીઓ, ખેડૂતો અને નાગરિકોને વિવિધ ઓનલાઈન સેવાઓ પૂરી પાડી રહ્યું છે. અમારો ઉદ્દેશ્ય જટિલ સરકારી અને શૈક્ષણિક પ્રક્રિયાઓને સામાન્ય માણસ માટે સરળ બનાવવાનો છે.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">અમારું લક્ષ્ય</h2>
          <p>
            આજના ડિજિટલ યુગમાં દરેક સરકારી કામકાજ ઓનલાઈન થઈ ગયું છે. ઘણીવાર ગ્રામીણ વિસ્તારોના લોકોને અથવા વિદ્યાર્થીઓને યોગ્ય માર્ગદર્શન ન મળવાને કારણે તેઓ યોજનાઓના લાભથી વંચિત રહી જાય છે. અમારું લક્ષ્ય એક એવું પ્લેટફોર્મ પૂરું પાડવાનું છે જ્યાં લોકોને ઘરે બેઠા, સંપૂર્ણ પારદર્શિતા સાથે ઓનલાઈન સેવાઓ મળી રહે.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">અમે શું ઑફર કરીએ છીએ?</h2>
          <ul className="space-y-4 list-none pl-0">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
              <span><strong>વિદ્યાર્થી સહાય:</strong> શૈક્ષણિક ફોર્મ્સ, કોલેજ એડમિશન, અને સ્કોલરશિપ માટે સંપૂર્ણ માર્ગદર્શન અને ફોર્મ ફિલિંગ સુવિધા.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
              <span><strong>સરકારી યોજનાઓ:</strong> આયુષ્માન કાર્ડ, ઇ-શ્રમ કાર્ડ, રેશન કાર્ડ જેવા મહત્વના દસ્તાવેજો માટેની કામગીરી.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
              <span><strong>નોકરીની તકો:</strong> ગુજરાત અને કેન્દ્ર સરકારની વિવિધ ભરતીઓના ફોર્મ યોગ્ય રીતે ભરવાની સુવિધા.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">શા માટે અમને પસંદ કરવા?</h2>
          <p>
            અમે તમારા સમય અને ડેટાની સુરક્ષાને સર્વોચ્ચ પ્રાથમિકતા આપીએ છીએ. તમારા દ્વારા પૂરા પાડવામાં આવેલા તમામ દસ્તાવેજો ખાનગી અને સુરક્ષિત રાખવામાં આવે છે. અમારી અનુભવી ટીમ ખાતરી કરે છે કે તમારું ફોર્મ કોઈપણ ભૂલ વગર, નિયત સમય મર્યાદામાં ભરાઈ જાય.
          </p>

          <div className="mt-16 bg-primary text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">અમારી સાથે જોડાવો</h3>
            <p className="mb-6 opacity-90">
              તમારું આગલું ઓનલાઈન કામ અમારા પર છોડી દો અને નિશ્ચિંત બનો.
            </p>
            <a href="/services" className="inline-block bg-white text-primary font-bold px-6 py-3 rounded-md hover:bg-slate-100 transition-colors">
              સેવાઓ જુઓ
            </a>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
