import ClientLayout from "@/components/layout/ClientLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <div className="bg-slate-50 py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">મદદ અને પ્રશ્નો</h1>
            <p className="text-lg text-slate-600">
              તમારા મનમાં રહેલા સામાન્ય પ્રશ્નોના જવાબો અહીંથી મેળવો.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white border rounded-lg px-6 py-2 shadow-sm">
                <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-primary hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-slate-600 leading-relaxed pb-4 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-3">વધુ માહિતીની જરૂર છે?</h3>
            <p className="text-slate-600 mb-6">
              અમારી ટીમ તમને મદદ કરવા માટે તૈયાર છે.
            </p>
            <a 
              href="/contact" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              અમારો સંપર્ક કરો
            </a>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
