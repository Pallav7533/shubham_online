import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  Clock,
  ShieldCheck
} from "lucide-react";
import ClientLayout from "@/components/layout/ClientLayout";

export default function Home() {
  return (
    <ClientLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Shubham Online Service Center" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-sm font-semibold tracking-wide">ગુજરાતનું ભરોસાપાત્ર સર્વિસ સેન્ટર</span>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
              તમામ સરકારી કામકાજ <br />
              <span className="text-secondary relative whitespace-nowrap">
                હવે ઘર બેઠા
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>
            
            <p className="font-sans text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              એડમિશન ફોર્મ, સરકારી યોજનાઓ, નોકરી ફોર્મ, સ્કોલરશિપ, PAN, પાસપોર્ટ અને અન્ય ઓનલાઈન સેવાઓ સરળતાથી અને સંપૂર્ણ ચોકસાઈથી મેળવો.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary text-lg font-bold px-8 py-7 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:scale-105" asChild>
                <Link href="/services">
                  સેવા શરૂ કરો <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-7 rounded-full border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all" asChild>
                <Link href="/contact">સંપર્ક કરો</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="py-16 bg-white border-b border-slate-100 relative z-10 mx-4 sm:mx-8 lg:mx-auto lg:max-w-6xl rounded-3xl shadow-xl -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 text-center divide-x divide-slate-100">
          <div className="p-4 transform transition-transform hover:-translate-y-1">
            <h4 className="font-serif text-4xl font-bold text-primary mb-2">500<span className="text-secondary">+</span></h4>
            <p className="font-sans text-sm font-medium text-slate-500 uppercase tracking-wider">ખુશ ગ્રાહક</p>
          </div>
          <div className="p-4 transform transition-transform hover:-translate-y-1">
            <h4 className="font-serif text-4xl font-bold text-primary mb-2">16<span className="text-secondary">+</span></h4>
            <p className="font-sans text-sm font-medium text-slate-500 uppercase tracking-wider">સેવાઓ</p>
          </div>
          <div className="p-4 transform transition-transform hover:-translate-y-1">
            <h4 className="font-serif text-4xl font-bold text-primary mb-2">5<span className="text-secondary">+</span></h4>
            <p className="font-sans text-sm font-medium text-slate-500 uppercase tracking-wider">વર્ષ અનુભવ</p>
          </div>
          <div className="p-4 transform transition-transform hover:-translate-y-1">
            <h4 className="font-serif text-4xl font-bold text-primary mb-2">24/7</h4>
            <p className="font-sans text-sm font-medium text-slate-500 uppercase tracking-wider">ઓનલાઈન સહાય</p>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">મુખ્ય સેવાઓ</h2>
            <p className="font-sans text-lg text-slate-600">તમારી જરૂરિયાત મુજબની સેવા પસંદ કરો. અમે તમામ કામગીરી ઝડપી અને પારદર્શક રીતે પૂર્ણ કરીશું.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Edu Card */}
            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-white">
              <div className="h-48 w-full bg-blue-50 relative overflow-hidden">
                <img src="/images/edu.png" alt="શૈક્ષણિક સેવાઓ" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <CardContent className="p-8 text-center relative bg-white">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full p-2 shadow-sm">
                  <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4 text-primary mt-4">શૈક્ષણિક સેવાઓ</h3>
                <p className="font-sans text-slate-600 mb-8 leading-relaxed">કોલેજ એડમિશન, ITI, સ્કોલરશિપ અને અન્ય યુનિવર્સિટી ફોર્મ ભરાવવાની સંપૂર્ણ સુવિધા.</p>
                <Button variant="ghost" className="font-sans font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 w-full group-hover:bg-blue-50" asChild>
                  <Link href="/services">વધુ જાણો <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
              </CardContent>
            </Card>

            {/* Gov Card */}
            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-white">
              <div className="h-48 w-full bg-orange-50 relative overflow-hidden">
                <img src="/images/gov.png" alt="સરકારી સેવાઓ" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <CardContent className="p-8 text-center relative bg-white">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full p-2 shadow-sm">
                  <div className="w-full h-full bg-secondary/20 rounded-full flex items-center justify-center text-secondary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4 text-primary mt-4">સરકારી સેવાઓ</h3>
                <p className="font-sans text-slate-600 mb-8 leading-relaxed">PAN કાર્ડ, પાસપોર્ટ, આવકનો દાખલો, જાતિ પ્રમાણપત્ર, EWS અને આધાર અપડેટ.</p>
                <Button variant="ghost" className="font-sans font-bold text-secondary hover:text-orange-600 hover:bg-orange-50 w-full group-hover:bg-orange-50" asChild>
                  <Link href="/services">વધુ જાણો <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
              </CardContent>
            </Card>

            {/* Job Card */}
            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-white">
              <div className="h-48 w-full bg-teal-50 relative overflow-hidden">
                <img src="/images/job.png" alt="નોકરી સેવાઓ" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <CardContent className="p-8 text-center relative bg-white">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full p-2 shadow-sm">
                  <div className="w-full h-full bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4 text-primary mt-4">નોકરી સેવાઓ</h3>
                <p className="font-sans text-slate-600 mb-8 leading-relaxed">GPSC, GSSSB, પોલીસ, રેલવે અને બેન્ક ભરતીના તમામ ફોર્મ ચોકસાઈથી ભરો.</p>
                <Button variant="ghost" className="font-sans font-bold text-teal-600 hover:text-teal-700 hover:bg-teal-50 w-full group-hover:bg-teal-50" asChild>
                  <Link href="/services">વધુ જાણો <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features/Why Us */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-texture opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">શા માટે શુભમ ઓનલાઈન પસંદ કરવું?</h2>
              <p className="font-sans text-lg text-white/80 mb-10 leading-relaxed">
                અમે માત્ર ફોર્મ ભરતા નથી, અમે તમારી કારકિર્દી અને ભવિષ્યની ચિંતા કરીએ છીએ. અમારી નિષ્ણાત ટીમ દરેક અરજીને ડબલ ચેક કરે છે.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-secondary/20 p-3 rounded-xl text-secondary h-fit">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-white mb-2">100% ચોકસાઈ</h4>
                    <p className="font-sans text-white/70">દરેક ફોર્મની બે વાર ચકાસણી કરવામાં આવે છે જેથી રિજેક્ટ થવાનો કોઈ ભય ન રહે.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-secondary/20 p-3 rounded-xl text-secondary h-fit">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-white mb-2">સુરક્ષિત દસ્તાવેજો</h4>
                    <p className="font-sans text-white/70">તમારા આધાર, પાન કે માર્કશીટ જેવા અગત્યના દસ્તાવેજો સંપૂર્ણ ખાનગી અને સુરક્ષિત રહે છે.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-secondary/20 p-3 rounded-xl text-secondary h-fit">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-white mb-2">ઝડપી પ્રક્રિયા</h4>
                    <p className="font-sans text-white/70">અરજી કર્યાના 24 કલાકમાં ફોર્મ ભરવાની પ્રક્રિયા પૂર્ણ કરી રસીદ આપવામાં આવે છે.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-secondary rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
              <img src="/images/office.png" alt="Office Ambiance" className="rounded-3xl shadow-2xl relative z-10 w-full h-auto object-cover border-4 border-white/10" />
              
              <div className="absolute -bottom-8 -left-8 bg-white text-primary p-6 rounded-2xl shadow-xl z-20 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-bold text-slate-500 uppercase">ડેઈલી સર્વિસ</p>
                    <p className="font-serif text-2xl font-bold">50+ ફોર્મ્સ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </ClientLayout>
  );
}