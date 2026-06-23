import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  Zap, 
  ShieldCheck, 
  Headset, 
  MapPin, 
  ArrowRight
} from "lucide-react";
import ClientLayout from "@/components/layout/ClientLayout";

export default function Home() {
  return (
    <ClientLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 lg:py-32">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] rounded-full bg-secondary/5 blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              તમારી તમામ ઓનલાઈન સેવાઓ <br />
              <span className="text-primary">હવે ઘર બેઠા</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              એડમિશન ફોર્મ, સરકારી યોજનાઓ, નોકરી ફોર્મ, સ્કોલરશિપ, PAN, પાસપોર્ટ અને અન્ય ઓનલાઈન સેવાઓ સરળતાથી મેળવો.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-full" asChild>
                <Link href="/services">
                  સેવા શરૂ કરો <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-primary/20 hover:bg-primary/5" asChild>
                <Link href="/contact">અમારો સંપર્ક કરો</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">મુખ્ય સેવાઓ</h2>
            <div className="h-1.5 w-20 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">શૈક્ષણિક સેવાઓ</h3>
                <p className="text-slate-600 mb-6">કોલેજ એડમિશન, ITI, સ્કોલરશિપ અને અન્ય યુનિવર્સિટી ફોર્મ.</p>
                <Button variant="ghost" className="text-primary hover:text-primary hover:bg-blue-50" asChild>
                  <Link href="/services">વધુ જાણો <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-orange-100 text-secondary rounded-2xl flex items-center justify-center mb-6">
                  <Landmark className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">સરકારી સેવાઓ</h3>
                <p className="text-slate-600 mb-6">PAN કાર્ડ, પાસપોર્ટ, આવકનો દાખલો, જાતિ પ્રમાણપત્ર અને આધાર.</p>
                <Button variant="ghost" className="text-secondary hover:text-secondary hover:bg-orange-50" asChild>
                  <Link href="/services">વધુ જાણો <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">નોકરી સેવાઓ</h3>
                <p className="text-slate-600 mb-6">GPSC, GSSSB, પોલીસ, રેલવે અને બેન્ક ભરતીના ફોર્મ.</p>
                <Button variant="ghost" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50" asChild>
                  <Link href="/services">વધુ જાણો <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <Zap className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h4 className="text-lg font-semibold">ઝડપી સેવા</h4>
            </div>
            <div className="p-6">
              <ShieldCheck className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h4 className="text-lg font-semibold">સુરક્ષિત દસ્તાવેજ વ્યવસ્થા</h4>
            </div>
            <div className="p-6">
              <Headset className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h4 className="text-lg font-semibold">ઓનલાઈન સહાય</h4>
            </div>
            <div className="p-6">
              <MapPin className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h4 className="text-lg font-semibold">ગુજરાતભરમાં સેવા</h4>
            </div>
          </div>
        </div>
      </section>

    </ClientLayout>
  );
}
