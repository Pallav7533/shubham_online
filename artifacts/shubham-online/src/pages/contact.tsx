import ClientLayout from "@/components/layout/ClientLayout";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <ClientLayout>
      {/* Header */}
      <div className="bg-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">સંપર્ક કરો</h1>
            <p className="font-sans text-xl text-white/80 leading-relaxed">
              અમને મળો, કોલ કરો અથવા WhatsApp દ્વારા મેસેજ મોકલો. અમે તમારી મદદ કરવા હંમેશા તૈયાર છીએ.
            </p>
          </div>
        </div>
      </div>

      <div className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="font-serif text-3xl font-bold text-primary mb-8 border-b-2 border-secondary inline-block pb-2">અમારું કાર્યાલય</h2>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow group overflow-hidden bg-white">
                <CardContent className="p-8 flex items-start gap-6 relative">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                  <div className="bg-primary p-4 rounded-2xl text-secondary shrink-0 shadow-md">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-primary mb-3">સરનામું</h3>
                    <p className="font-sans text-slate-600 leading-relaxed text-lg">
                      શુભમ ઓનલાઈન,<br />
                      મુખ્ય બજાર, સિટી સેન્ટર કોમ્પ્લેક્સ,<br />
                      રાજકોટ, ગુજરાત - 360001
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow group overflow-hidden bg-white">
                <CardContent className="p-8 flex items-start gap-6 relative">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-secondary/10 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                  <div className="bg-primary p-4 rounded-2xl text-secondary shrink-0 shadow-md">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-primary mb-3">ફોન અને WhatsApp</h3>
                    <p className="font-sans text-slate-600 mb-4 text-lg font-medium tracking-wide">+91 99999 99999</p>
                    <a 
                      href="https://wa.me/919999999999" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1ebd5a] transition-all hover:scale-105 shadow-md"
                    >
                      <MessageCircle className="w-6 h-6" />
                      WhatsApp પર મેસેજ કરો
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow group overflow-hidden bg-white">
                <CardContent className="p-8 flex items-start gap-6 relative">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                  <div className="bg-primary p-4 rounded-2xl text-secondary shrink-0 shadow-md">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-primary mb-3">ઈમેલ</h3>
                    <p className="font-sans text-slate-600 text-lg">shubhamonline@gmail.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow group overflow-hidden bg-white">
                <CardContent className="p-8 flex items-start gap-6 relative">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                  <div className="bg-primary p-4 rounded-2xl text-secondary shrink-0 shadow-md">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-primary mb-3">કાર્યકાળ</h3>
                    <p className="font-sans text-slate-600 text-lg leading-relaxed">
                      સોમવારથી શનિવાર: સવારે 9:00 થી સાંજે 7:00<br />
                      રવિવાર: <span className="font-semibold text-red-500">રજા</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="h-full min-h-[600px] bg-slate-200 rounded-3xl overflow-hidden relative shadow-xl border-8 border-white">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-primary bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                <div className="bg-white p-6 rounded-full shadow-lg mb-6 animate-bounce">
                  <MapPin className="w-16 h-16 text-secondary" />
                </div>
                <span className="font-serif text-3xl font-bold mb-2 text-primary">Google Map</span>
                <span className="font-sans text-lg font-medium text-slate-600">રાજકોટ, ગુજરાત</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ClientLayout>
  );
}