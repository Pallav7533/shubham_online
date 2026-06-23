import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { useUpdatePayment, useGetRequest } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import ClientLayout from "@/components/layout/ClientLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { QrCode, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
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
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">માન્ય અરજી નંબર મળ્યો નથી</h2>
          <Button asChild><Link href="/services">પાછા ફરો</Link></Button>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="bg-slate-50 py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">સેવા ચાર્જ ચુકવણી</h1>
            <p className="text-lg text-slate-600">
              અરજી નંબર <span className="font-bold text-primary">#{requestId}</span> માટે ચુકવણી પૂર્ણ કરો.
            </p>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl">
          {isSuccess ? (
            <Card className="border-0 shadow-lg text-center p-8">
              <div className="flex justify-center mb-6">
                <CheckCircle2 className="w-20 h-20 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">તમારી અરજી સફળતાપૂર્વક સબમિટ થઈ ગઈ છે!</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                અમે તમારી અરજીની ચકાસણી કરીશું. તમે આપેલા મોબાઈલ નંબર પર WhatsApp અથવા કોલ દ્વારા તમને અપડેટ મળશે.
              </p>
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/">મુખ્ય પૃષ્ઠ પર પાછા ફરો</Link>
              </Button>
            </Card>
          ) : (
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-slate-900 p-8 text-center text-white">
                <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto flex items-center justify-center mb-4">
                  <QrCode className="w-32 h-32 text-slate-900" />
                </div>
                <h3 className="text-xl font-semibold mb-1">આ QR કોડ સ્કેન કરો</h3>
                <p className="text-slate-300 font-mono text-lg tracking-wider">shubhamonline@upi</p>
              </div>
              
              <CardContent className="p-8">
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-8 text-sm text-orange-800">
                  <p className="font-medium mb-1">ચુકવણી સૂચના:</p>
                  <ul className="list-disc pl-5 space-y-1 text-orange-700">
                    <li>QR કોડ સ્કેન કરીને રૂ. 100/- નો ચાર્જ ચૂકવો.</li>
                    <li>ચુકવણી પૂર્ણ થયા પછી નીચે ટ્રાન્ઝેક્શન નંબર દાખલ કરો અને સ્ક્રીનશોટ અપલોડ કરો.</li>
                  </ul>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="txnId" className="text-base font-semibold">ટ્રાન્ઝેક્શન ID / UTR નંબર *</Label>
                    <Input 
                      id="txnId" 
                      value={transactionId} 
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="દા.ત. 123456789012" 
                      className="h-12 text-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">પેમેન્ટ સ્ક્રીનશોટ *</Label>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      className="file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-4 file:py-1 cursor-pointer h-12 pt-2.5" 
                    />
                  </div>

                  <div className="pt-4 flex gap-4">
                    <Button type="button" variant="outline" className="h-14 w-full" asChild>
                      <Link href={`/apply?service=${requestData?.serviceType || ''}`}>
                        <ArrowLeft className="mr-2 w-4 h-4" /> પાછા ફરો
                      </Link>
                    </Button>
                    <Button 
                      type="submit" 
                      className="h-14 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg"
                      disabled={updatePayment.isPending}
                    >
                      {updatePayment.isPending ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : null}
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
