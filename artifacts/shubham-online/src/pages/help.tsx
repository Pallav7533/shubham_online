import ClientLayout from "@/components/layout/ClientLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "ફોર્મ ભરાવવા કેટલો સમય લાગે?",
    answer: "સામાન્ય રીતે ફોર્મ ભરવામાં 15 થી 30 મિનિટનો સમય લાગે છે. જો કે, સરકારની વેબસાઇટની ઝડપ અને દસ્તાવેજોની ચકાસણી પર આધાર રાખીને સમયમાં વધઘટ થઈ શકે છે."
  },
  {
    question: "દસ્તાવેજો કયા જરૂરી છે?",
    answer: "દરેક સેવા માટે અલગ અલગ દસ્તાવેજોની જરૂર હોય છે. મોટાભાગની સેવાઓ માટે આધાર કાર્ડ, પાસપોર્ટ સાઇઝ ફોટો અને સહી ફરજિયાત છે. શૈક્ષણિક ફોર્મ માટે માર્કશીટ અને સરકારી દાખલાઓ માટે રેશન કાર્ડ જેવા અન્ય દસ્તાવેજોની જરૂર પડી શકે છે."
  },
  {
    question: "ચુકવણી કેવી રીતે કરવી?",
    answer: "તમે ઓનલાઈન ફોર્મ સબમિટ કર્યા પછી આપેલા QR કોડ પરથી Google Pay, PhonePe અથવા Paytm દ્વારા ચુકવણી કરી શકો છો. ચુકવણી કર્યા પછી ટ્રાન્ઝેક્શન નંબર અને સ્ક્રીનશોટ અપલોડ કરવાનો રહેશે."
  },
  {
    question: "મારી અરજીનું સ્ટેટસ કેવી રીતે જાણવા મળશે?",
    answer: "અમે તમારી અરજીની પ્રક્રિયા વિશે તમને WhatsApp અથવા SMS દ્વારા અપડેટ મોકલીશું. ફોર્મ સફળતાપૂર્વક ભરાઈ ગયા પછી ફોર્મની PDF કોપી પણ તમને મોકલી આપવામાં આવશે."
  },
  {
    question: "શું દસ્તાવેજો ઓરિજિનલ મોકલવાના હોય છે?",
    answer: "ના, તમારે માત્ર દસ્તાવેજોના સ્પષ્ટ ફોટા અથવા PDF જ અપલોડ કરવાના રહેશે. કોઈ પણ ઓરિજિનલ દસ્તાવેજ અમને આપવાની જરૂર નથી."
  },
  {
    question: "જો ફોર્મમાં કોઈ ભૂલ થાય તો શું?",
    answer: "અમે ફોર્મ સબમિટ કરતા પહેલા તમામ વિગતોની ડબલ ચેકિંગ કરીએ છીએ. છતાં જો કોઈ ક્ષતિ જણાય તો તમે ફોર્મ સબમિટ થયાના 24 કલાકમાં અમને જાણ કરી શકો છો."
  }
];

export default function Help() {
  return (
    <ClientLayout>
      {/* Header */}
      <div className="bg-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl flex items-center gap-6">
            <div className="bg-secondary p-4 rounded-2xl text-primary hidden sm:block">
              <HelpCircle className="w-12 h-12" />
            </div>
            <div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">મદદ અને પ્રશ્નો</h1>
              <p className="font-sans text-xl text-white/80">
                તમારા મનમાં રહેલા સામાન્ય પ્રશ્નોના જવાબો અહીંથી મેળવો.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
            <Accordion type="single" collapsible className="w-full space-y-6">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-2 transition-all hover:border-primary/30 data-[state=open]:border-primary data-[state=open]:bg-white data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="font-serif text-xl font-bold text-primary hover:text-primary/80 hover:no-underline text-left py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-lg text-slate-600 leading-relaxed pb-6 pt-2 border-t border-slate-100 mt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-16 bg-primary border-4 border-secondary/30 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
            <div className="relative z-10">
              <h3 className="font-serif text-3xl font-bold text-white mb-4">વધુ માહિતીની જરૂર છે?</h3>
              <p className="font-sans text-xl text-white/80 mb-10">
                અમારી ટીમ તમને મદદ કરવા માટે હંમેશા તૈયાર છે. કોઈ પણ પ્રશ્ન હોય, બેધડક સંપર્ક કરો.
              </p>
              <a 
                href="/contact" 
                className="inline-flex h-14 items-center justify-center rounded-full bg-secondary px-10 text-lg font-bold text-primary shadow-lg transition-all hover:bg-white hover:scale-105"
              >
                અમારો સંપર્ક કરો
              </a>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}