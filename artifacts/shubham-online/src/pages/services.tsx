import ClientLayout from "@/components/layout/ClientLayout";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Landmark, Briefcase, FileText } from "lucide-react";

const services = [
  {
    category: "શૈક્ષણિક સેવાઓ",
    icon: GraduationCap,
    image: "/images/edu.png",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    items: [
      { name: "કોલેજ એડમિશન ફોર્મ", desc: "કોઈપણ કોલેજમાં ઓનલાઈન એડમિશન ફોર્મ ભરાવો." },
      { name: "ITI એડમિશન", desc: "ITI માં પ્રવેશ માટેનું સંપૂર્ણ ઓનલાઈન ફોર્મ." },
      { name: "પોલિટેકનિક એડમિશન", desc: "ડિપ્લોમા એન્જિનિયરિંગ એડમિશન પ્રક્રિયા." },
      { name: "સ્કોલરશિપ ફોર્મ", desc: "ડિજિટલ ગુજરાત અને નેશનલ સ્કોલરશિપ ફોર્મ." },
      { name: "યુનિવર્સિટી ફોર્મ", desc: "પરીક્ષા ફોર્મ અને ડીગ્રી સર્ટિફિકેટ માટે અરજી." },
    ]
  },
  {
    category: "સરકારી સેવાઓ",
    icon: Landmark,
    image: "/images/gov.png",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    items: [
      { name: "PAN કાર્ડ", desc: "નવું PAN કાર્ડ કાઢવા અથવા સુધારો કરવા." },
      { name: "પાસપોર્ટ સહાય", desc: "નવો પાસપોર્ટ અને રિન્યુઅલ માટેની સહાય." },
      { name: "આવકનો દાખલો", desc: "સરકારી અને ખાનગી કામ માટે આવકનો દાખલો." },
      { name: "જાતિનો દાખલો", desc: "OBC, SC, ST જાતિ પ્રમાણપત્ર." },
      { name: "EWS પ્રમાણપત્ર", desc: "આર્થિક રીતે નબળા વર્ગ માટેનું પ્રમાણપત્ર." },
      { name: "આધાર અપડેટ", desc: "નામ, સરનામું કે મોબાઈલ નંબર અપડેટ કરો." },
    ]
  },
  {
    category: "નોકરી સેવાઓ",
    icon: Briefcase,
    image: "/images/job.png",
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-100",
    items: [
      { name: "GPSC ફોર્મ", desc: "ગુજરાત જાહેર સેવા આયોગની તમામ ભરતીના ફોર્મ." },
      { name: "GSSSB ફોર્મ", desc: "ગૌણ સેવા પસંદગી મંડળની ભરતીઓ." },
      { name: "પોલીસ ભરતી", desc: "લોકરક્ષક, PSI અને અન્ય પોલીસ ભરતી." },
      { name: "રેલવે ભરતી", desc: "RRB ની વિવિધ ખાલી જગ્યાઓ માટે અરજી." },
      { name: "બેન્ક ભરતી", desc: "IBPS, SBI અને અન્ય બેન્કિંગ પરીક્ષા ફોર્મ." },
    ]
  }
];

export default function Services() {
  return (
    <ClientLayout>
      {/* Header */}
      <div className="bg-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-secondary mb-6">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">અમારી તમામ સેવાઓ</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">ઓનલાઈન સેવાઓ</h1>
            <p className="font-sans text-xl text-white/80 leading-relaxed">
              તમારું કામ સરળ બનાવવા માટે અમે વિવિધ પ્રકારની ઓનલાઈન સેવાઓ પ્રદાન કરીએ છીએ. 
              નીચે મુજબની સેવાઓમાંથી પસંદગી કરો.
            </p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {services.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div key={idx} className="relative">
                {/* Category Header with Image */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                  <div className={`w-32 h-32 md:w-48 md:h-48 rounded-3xl overflow-hidden shrink-0 shadow-lg border-4 border-white`}>
                    <img src={category.image} alt={category.category} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${category.bgColor} ${category.color} mb-4 font-bold tracking-wide text-sm border ${category.borderColor}`}>
                      <Icon className="w-5 h-5" />
                      કેટેગરી
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary">{category.category}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item, itemIdx) => (
                    <Card key={itemIdx} className="group border-0 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden flex flex-col">
                      <div className={`h-2 w-full ${category.bgColor}`}></div>
                      <CardHeader className="flex-1 pb-4">
                        <CardTitle className="font-serif text-2xl text-primary group-hover:text-secondary transition-colors">{item.name}</CardTitle>
                        <CardDescription className="font-sans text-slate-600 text-base mt-3 leading-relaxed">
                          {item.desc}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-4 pb-6 px-6">
                        <Button className="w-full font-bold bg-primary hover:bg-primary/90 text-white h-12 rounded-xl transition-all group-hover:bg-secondary group-hover:text-primary" asChild>
                          <Link href={`/apply?service=${encodeURIComponent(item.name)}`}>
                            અરજી કરો <ArrowRight className="ml-2 w-5 h-5" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ClientLayout>
  );
}