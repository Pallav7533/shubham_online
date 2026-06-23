import ClientLayout from "@/components/layout/ClientLayout";
import { CheckCircle2, Target, Award, HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <ClientLayout>
      {/* Header */}
      <div className="bg-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">અમારા વિશે</h1>
            <p className="font-sans text-xl text-secondary font-medium tracking-wide">
              શુભમ ઓનલાઈન — તમારો વિશ્વાસપાત્ર ડિજિટલ સાથી.
            </p>
          </div>
        </div>
      </div>

      <div className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary rounded-3xl transform -rotate-3 scale-105 opacity-20"></div>
              <img src="/images/office.png" alt="શુભમ ઓનલાઈન ઓફિસ" className="rounded-3xl shadow-2xl relative z-10 w-full h-auto object-cover border-8 border-white" />
            </div>
            
            <div className="prose prose-lg prose-slate max-w-none">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">અમારી સફર</h2>
              <p className="font-sans text-xl text-slate-700 leading-relaxed mb-6">
                શુભમ ઓનલાઈન છેલ્લા <strong className="text-primary font-bold">5 વર્ષથી</strong> વિદ્યાર્થીઓ, ખેડૂતો અને નાગરિકોને વિવિધ ઓનલાઈન સેવાઓ પૂરી પાડી રહ્યું છે. અમારો ઉદ્દેશ્ય જટિલ સરકારી અને શૈક્ષણિક પ્રક્રિયાઓને સામાન્ય માણસ માટે સરળ બનાવવાનો છે.
              </p>
              <p className="font-sans text-lg text-slate-600 leading-relaxed mb-8">
                અમે માનીએ છીએ કે યોગ્ય માર્ગદર્શન અને તકનીકી સહાય દ્વારા દરેક વ્યક્તિ સરકારી યોજનાઓ અને નોકરીની તકોનો લાભ મેળવી શકે છે.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-primary mb-2">અમારું લક્ષ્ય</h4>
                    <p className="font-sans text-sm text-slate-600">પારદર્શકતા સાથે દરેક નાગરિકને ડિજિટલ સેવાઓ ઘર બેઠા પૂરી પાડવી.</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                  <div className="bg-secondary/20 p-3 rounded-xl text-secondary shrink-0">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-primary mb-2">અમારો અભિગમ</h4>
                    <p className="font-sans text-sm text-slate-600">દરેક ગ્રાહકને પરિવારના સભ્યની જેમ મદદ કરવી અને સાચું માર્ગદર્શન આપવું.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-primary mt-12 mb-10 text-center">અમે શું ઑફર કરીએ છીએ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-blue-500 hover:-translate-y-2 transition-transform">
                <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" /> વિદ્યાર્થી સહાય
                </h3>
                <p className="font-sans text-slate-600 leading-relaxed">શૈક્ષણિક ફોર્મ્સ, કોલેજ એડમિશન, અને સ્કોલરશિપ માટે સંપૂર્ણ માર્ગદર્શન અને ભૂલરહિત ફોર્મ ફિલિંગ સુવિધા.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-orange-500 hover:-translate-y-2 transition-transform">
                <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-500" /> સરકારી યોજનાઓ
                </h3>
                <p className="font-sans text-slate-600 leading-relaxed">આયુષ્માન કાર્ડ, ઇ-શ્રમ કાર્ડ, રેશન કાર્ડ જેવા મહત્વના દસ્તાવેજો માટેની ઝડપી કામગીરી.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-teal-500 hover:-translate-y-2 transition-transform">
                <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" /> નોકરીની તકો
                </h3>
                <p className="font-sans text-slate-600 leading-relaxed">ગુજરાત અને કેન્દ્ર સરકારની વિવિધ ભરતીઓના ફોર્મ યોગ્ય રીતે ભરવાની સુવિધા જેથી અરજી રદ ન થાય.</p>
              </div>
            </div>

            <div className="mt-20 bg-primary relative overflow-hidden text-white p-12 rounded-3xl shadow-xl text-center">
              <div className="absolute inset-0 bg-pattern-texture opacity-30"></div>
              <div className="relative z-10">
                <Award className="w-16 h-16 text-secondary mx-auto mb-6" />
                <h3 className="font-serif text-3xl font-bold mb-4">શા માટે અમને પસંદ કરવા?</h3>
                <p className="font-sans text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                  અમે તમારા સમય અને ડેટાની સુરક્ષાને સર્વોચ્ચ પ્રાથમિકતા આપીએ છીએ. તમારા દ્વારા પૂરા પાડવામાં આવેલા તમામ દસ્તાવેજો ખાનગી અને સુરક્ષિત રાખવામાં આવે છે. અમારી અનુભવી ટીમ ખાતરી કરે છે કે તમારું ફોર્મ કોઈપણ ભૂલ વગર, નિયત સમય મર્યાદામાં ભરાઈ જાય.
                </p>
                <a href="/services" className="inline-block bg-secondary text-primary font-bold text-lg px-8 py-4 rounded-full hover:bg-white hover:text-primary hover:scale-105 transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                  અમારી સેવાઓ જુઓ
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ClientLayout>
  );
}