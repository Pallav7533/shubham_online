import ClientLayout from "@/components/layout/ClientLayout";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <ClientLayout>
      <div className="bg-slate-50 py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">સંપર્ક કરો</h1>
            <p className="text-lg text-slate-600">
              અમને મળો, કોલ કરો અથવા WhatsApp દ્વારા મેસેજ મોકલો. અમે તમારી મદદ કરવા હંમેશા તૈયાર છીએ.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">અમારું કાર્યાલય</h2>
              
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">સરનામું</h3>
                    <p className="text-slate-600 leading-relaxed">
                      શુભમ ઓનલાઈન,<br />
                      મુખ્ય બજાર, સિટી સેન્ટર કોમ્પ્લેક્સ,<br />
                      રાજકોટ, ગુજરાત - 360001
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">ફોન અને WhatsApp</h3>
                    <p className="text-slate-600 mb-3">+91 99999 99999</p>
                    <a 
                      href="https://wa.me/919999999999" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-md font-medium hover:bg-[#1ebd5a] transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp પર મેસેજ કરો
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">ઈમેલ</h3>
                    <p className="text-slate-600">shubhamonline@gmail.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">કાર્યકાળ</h3>
                    <p className="text-slate-600">
                      સોમવારથી શનિવાર: સવારે 9:00 થી સાંજે 7:00<br />
                      રવિવાર: રજા
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="h-[600px] bg-slate-200 rounded-2xl overflow-hidden relative shadow-inner border border-slate-300">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                <MapPin className="w-16 h-16 text-slate-400 mb-4" />
                <span className="text-xl font-semibold">Google Map</span>
                <span className="text-sm mt-2">રાજકોટ, ગુજરાત</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
