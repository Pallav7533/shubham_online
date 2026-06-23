import ClientLayout from "@/components/layout/ClientLayout";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Landmark, Briefcase } from "lucide-react";

const services = [
  {
    category: "શૈક્ષણિક સેવાઓ",
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
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
    color: "text-orange-500",
    bgColor: "bg-orange-100",
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
    color: "text-teal-600",
    bgColor: "bg-teal-100",
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
      <div className="bg-slate-50 py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">અમારી ઓનલાઈન સેવાઓ</h1>
            <p className="text-lg text-slate-600">
              તમારું કામ સરળ બનાવવા માટે અમે વિવિધ પ્રકારની ઓનલાઈન સેવાઓ પ્રદાન કરીએ છીએ. 
              નીચે મુજબની સેવાઓમાંથી પસંદગી કરો.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {services.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div key={idx} className="space-y-8">
                <div className="flex items-center gap-4 border-b pb-4">
                  <div className={`p-3 rounded-xl ${category.bgColor} ${category.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{category.category}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIdx) => (
                    <Card key={itemIdx} className="hover:shadow-md transition-shadow border-slate-200">
                      <CardHeader>
                        <CardTitle className="text-xl text-slate-800">{item.name}</CardTitle>
                        <CardDescription className="text-slate-500 text-sm mt-2 leading-relaxed">
                          {item.desc}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white" asChild>
                          <Link href={`/apply?service=${encodeURIComponent(item.name)}`}>
                            અરજી કરો <ArrowRight className="ml-2 w-4 h-4" />
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
