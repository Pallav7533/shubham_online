import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { useUpdatePayment, useGetRequest } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import ClientLayout from "@/components/layout/ClientLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { QrCode, CheckCircle2, ArrowLeft, Loader2, IndianRupee, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function Payment() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const requestId = Number(searchParams.get("id"));
  
  const { toast } = useToast();
  const [transactionId, setTransactionId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Guard against invalid/missing ID
  const { data: requestData, isLoading } = useGetRequest(requestId, {
    query: {
      enabled: !!requestId && !isNaN(requestId),
    }
  });

  const updatePayment = useUpdatePayment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      toast({ title: "ભૂલ", description: "ટ્રાન્ઝેક્શન ID દાખલ કરો", variant: "destructive" });
      return;
    }

    updatePayment.mutate(
      { 
        id: requestId, 
        data: { transactionId, paymentScreenshot: "uploaded-placeholder.png" } 
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          toast({ title: "ચુકવણી નોંધાઈ ગઈ છે", description: "અમે જલ્દીથી તમારી અરજી પર પ્રક્રિયા કરીશું." });
        },
        onError: () => {
          toast({ title: "ભૂલ", description: "ચુકવણી નોંધવામાં નિષ્ફળતા", variant: "destructive" });
        }
      }
    );
  };

  if (!requestId || isNaN(requestId)) {
    return (
      <ClientLayout>
        <div className="container mx-auto px-4 py-32 text-center max-w-lg">
          <div className="bg-slate-50 p-12 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="font-serif text-3xl font-bold mb-6 text-primary">માન્ય અરજી નંબર મળ્યો નથી</h2>
            <Button size="lg" className="rounded-full px-8 text-lg font-bold" asChild>
              <Link href="/services">પાછા ફરો</Link>
            </Button>
          </div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      {/* Header */}
      <div className="bg-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">સેવા ચાર્જ ચુકવણી</h1>
          <p className="font-sans text-xl text-white/80 inline-flex items-center gap-2 bg-white/10 px-6 py-2 rounded-full border border-white/20">
            અરજી નંબર <span className="font-mono font-bold text-secondary">#{requestId}</span>
          </p>
        </div>
      </div>

      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          {isSuccess ? (
            <Card className="border-0 shadow-2xl rounded-3xl text-center p-12 bg-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 bg-green-500"></div>
              <div className="flex justify-center mb-8">
                <div className="bg-green-100 p-6 rounded-full text-green-500 animate-bounce">
                  <CheckCircle2 className="w-20 h-20" />
                </div>
              </div>
              <h2 className="font-serif text-4xl font-bold text-primary mb-6">ચુકવણી સફળ!</h2>
              <p className="font-sans text-xl text-slate-600 mb-10 leading-relaxed">
                તમારી અરજી સફળતાપૂર્વક સબમિટ થઈ ગઈ છે. અમે તમારી અરજીની ચકાસણી કરીશું. 
                તમે આપેલા મોબાઈલ નંબર પર WhatsApp અથવા કોલ દ્વારા તમને અપડેટ મળશે.
              </p>
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-lg font-bold shadow-lg transition-transform hover:scale-105">
                <Link href="/">મુખ્ય પૃષ્ઠ પર પાછા ફરો</Link>
              </Button>
            </Card>
          ) : (
            <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
              <div className="bg-primary p-12 text-center text-white relative">
                <div className="absolute inset-0 bg-pattern-texture opacity-30"></div>
                <div className="relative z-10">
                  <div className="bg-white p-6 rounded-3xl w-56 h-56 mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.2)] transform transition-transform hover:scale-105">
                    <QrCode className="w-40 h-40 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-2">QR કોડ સ્કેન કરો</h3>
                  <p className="font-mono text-xl tracking-widest text-secondary font-bold bg-black/30 inline-block px-6 py-2 rounded-lg border border-white/10 mt-2">shubhamonline@upi</p>
                </div>
              </div>
              
              <CardContent className="p-8 sm:p-12">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10 flex gap-4 items-start">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans text-lg font-bold text-primary mb-2 flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" /> 100/- નો ચાર્જ ચૂકવો
                    </h4>
                    <p className="font-sans text-slate-600 leading-relaxed">
                      કોઈપણ UPI એપ (Google Pay, PhonePe, Paytm) વડે સ્કેન કરી ચુકવણી કરો. ચુકવણી પૂર્ણ થયા પછી નીચે ટ્રાન્ઝેક્શન નંબર દાખલ કરો.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="txnId" className="font-sans text-lg font-bold text-primary block">ટ્રાન્ઝેક્શન ID / UTR નંબર <span className="text-red-500">*</span></Label>
                    <Input 
                      id="txnId" 
                      value={transactionId} 
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="દા.ત. 123456789012" 
                      className="h-14 text-xl font-mono text-center tracking-widest rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="font-sans text-lg font-bold text-primary block">પેમેન્ટ સ્ક્રીનશોટ <span className="text-red-500">*</span></Label>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      className="file:bg-primary file:text-white file:border-0 file:rounded-lg file:px-6 file:py-2 file:mr-4 file:font-medium cursor-pointer h-auto py-3 px-3 w-full text-base bg-slate-50 rounded-xl" 
                    />
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <Button type="button" variant="outline" className="h-16 w-full sm:w-1/3 rounded-2xl text-lg font-bold border-slate-200 text-slate-600 hover:bg-slate-50" asChild>
                      <Link href={`/apply?service=${requestData?.serviceType || ''}`}>
                        <ArrowLeft className="mr-2 w-5 h-5" /> પાછા
                      </Link>
                    </Button>
                    <Button 
                      type="submit" 
                      className="h-16 w-full sm:w-2/3 bg-secondary hover:bg-secondary/90 text-primary text-xl font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
                      disabled={updatePayment.isPending}
                    >
                      {updatePayment.isPending ? <Loader2 className="animate-spin w-6 h-6 mr-3" /> : null}
                      ચુકવણી સબમિટ કરો
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ClientLayout>
  );
}