import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearch } from "wouter";
import { useCreateRequest, useUpdatePayment } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import ClientLayout from "@/components/layout/ClientLayout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadCloud, FileText, CheckCircle2, QrCode, IndianRupee, ShieldCheck, Loader2 } from "lucide-react";
import { Link } from "wouter";

const serviceOptions = [
  "કોલેજ એડમિશન ફોર્મ", "ITI એડમિશન", "પોલિટેકનિક એડમિશન", "સ્કોલરશિપ ફોર્મ", "યુનિવર્સિટી ફોર્મ",
  "PAN કાર્ડ", "પાસપોર્ટ સહાય", "આવકનો દાખલો", "જાતિનો દાખલો", "EWS પ્રમાણપત્ર", "આધાર અપડેટ",
  "GPSC ફોર્મ", "GSSSB ફોર્મ", "પોલીસ ભરતી", "રેલવે ભરતી", "બેન્ક ભરતી"
];

const formSchema = z.object({
  fullName: z.string().min(2, "પૂરું નામ દાખલ કરો"),
  mobile: z.string().length(10, "10 આંકડાનો મોબાઈલ નંબર દાખલ કરો").regex(/^\d+$/, "ફક્ત અંકો જ માન્ય છે"),
  email: z.string().email("યોગ્ય ઈમેલ દાખલ કરો").or(z.literal("")),
  city: z.string().min(2, "શહેરનું નામ દાખલ કરો"),
  serviceType: z.string().min(1, "સેવાનો પ્રકાર પસંદ કરો"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Apply() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const defaultService = searchParams.get("service") || "";
  const { toast } = useToast();

  const [transactionId, setTransactionId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const createRequest = useCreateRequest();
  const updatePayment = useUpdatePayment();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      city: "",
      serviceType: defaultService,
      notes: "",
    },
  });

  const isPending = createRequest.isPending || updatePayment.isPending;

  const onSubmit = (data: FormValues) => {
    if (!transactionId.trim()) {
      toast({ title: "ભૂલ", description: "ચુકવણી કર્યા પછી ટ્રાન્ઝેક્શન ID દાખલ કરો", variant: "destructive" });
      return;
    }

    createRequest.mutate(
      { data },
      {
        onSuccess: (response) => {
          updatePayment.mutate(
            { id: response.id, data: { transactionId, paymentScreenshot: "uploaded.png" } },
            {
              onSuccess: () => {
                setIsSuccess(true);
                toast({ title: "અરજી સફળતાપૂર્વક સબમિટ થઈ!", description: `અરજી નંબર: #${response.id}` });
              },
              onError: () => {
                toast({ title: "ભૂલ", description: "ચુકવણી નોંધવામાં ભૂલ. ફરી પ્રયાસ કરો.", variant: "destructive" });
              }
            }
          );
        },
        onError: () => {
          toast({ title: "ભૂલ", description: "અરજી નોંધવામાં નિષ્ફળતા. કૃપા કરીને ફરી પ્રયાસ કરો.", variant: "destructive" });
        }
      }
    );
  };

  if (isSuccess) {
    return (
      <ClientLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <Card className="border-0 shadow-2xl rounded-3xl text-center p-12 bg-white max-w-lg w-full overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="flex justify-center mb-8">
              <div className="bg-green-100 p-6 rounded-full text-green-500">
                <CheckCircle2 className="w-20 h-20" />
              </div>
            </div>
            <h2 className="font-serif text-4xl font-bold text-primary mb-4">અરજી સફળ!</h2>
            <p className="font-sans text-lg text-slate-600 mb-10 leading-relaxed">
              તમારી અરજી અને ચુકવણી સફળતાપૂર્વક નોંધાઈ ગઈ છે. અમારી ટીમ ટૂંક સમયમાં WhatsApp અથવા કોલ દ્વારા તમારો સંપર્ક કરશે.
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-lg font-bold shadow-lg">
              <Link href="/">મુખ્ય પૃષ્ઠ પર પાછા ફરો</Link>
            </Button>
          </Card>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      {/* Header */}
      <div className="bg-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">ઓનલાઈન અરજી કરો</h1>
            <p className="font-sans text-xl text-white/80 leading-relaxed">
              ફોર્મ ભરો, દસ્તાવેજ અપલોડ કરો, ચુકવણી કરો અને સબમિટ કરો — બધું એક જ પેજ પર.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
            <CardHeader className="bg-primary/5 border-b pb-8 pt-10 px-8 sm:px-12">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-secondary p-3 rounded-xl text-primary">
                  <FileText className="w-8 h-8" />
                </div>
                <CardTitle className="font-serif text-3xl font-bold text-primary">અરજી ફોર્મ</CardTitle>
              </div>
              <CardDescription className="font-sans text-lg text-slate-600">બધી વિગતો ભરો, ચુકવણી કરો, પછી સબમિટ કરો.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 sm:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

                  {/* Step 1: Personal Details */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                      <h3 className="font-serif text-xl font-bold text-primary">વ્યક્તિગત માહિતી</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-sans text-base font-bold text-primary">પૂરું નામ <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="દા.ત. રમેશભાઈ પટેલ" {...field} className="h-14 text-lg rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary" />
                            </FormControl>
                            <FormMessage className="font-sans" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-sans text-base font-bold text-primary">મોબાઈલ નંબર <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="10 આંકડાનો નંબર" maxLength={10} {...field} className="h-14 text-lg rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary" />
                            </FormControl>
                            <FormMessage className="font-sans" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-sans text-base font-bold text-primary">ઈમેલ (વૈકલ્પિક)</FormLabel>
                            <FormControl>
                              <Input placeholder="દા.ત. ramesh@gmail.com" type="email" {...field} className="h-14 text-lg rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary" />
                            </FormControl>
                            <FormMessage className="font-sans" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-sans text-base font-bold text-primary">શહેર/ગામ <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="દા.ત. રાજકોટ" {...field} className="h-14 text-lg rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary" />
                            </FormControl>
                            <FormMessage className="font-sans" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="font-sans text-base font-bold text-primary">સેવાનો પ્રકાર <span className="text-red-500">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-14 text-lg rounded-xl border-slate-200 focus:ring-secondary focus:border-secondary">
                                  <SelectValue placeholder="સેવા પસંદ કરો" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-80">
                                {serviceOptions.map(opt => (
                                  <SelectItem key={opt} value={opt} className="text-base py-3 cursor-pointer">{opt}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="font-sans" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="font-sans text-base font-bold text-primary">વધારાની નોંધ (વૈકલ્પિક)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="અહીં કોઈપણ વિશેષ સૂચના લખી શકો છો..."
                                className="min-h-[100px] resize-y text-lg rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary p-4"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="font-sans" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Step 2: Documents */}
                  <div className="border-t border-slate-100 pt-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
                      <h3 className="font-serif text-xl font-bold text-primary">દસ્તાવેજો અપલોડ</h3>
                    </div>
                    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-primary/30 transition-all">
                          <label className="font-sans text-base font-bold text-primary block mb-3 flex items-center gap-2">
                            <UploadCloud className="w-4 h-4" /> આધાર કાર્ડ
                          </label>
                          <Input type="file" accept=".pdf,.jpg,.jpeg,.png" className="file:bg-primary file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1.5 file:mr-3 file:font-medium cursor-pointer h-auto py-2 px-2 w-full text-sm bg-slate-50" />
                          <p className="font-sans text-xs text-slate-500 mt-2">PDF અથવા ઇમેજ (મેક્સ. 10MB)</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-primary/30 transition-all">
                          <label className="font-sans text-base font-bold text-primary block mb-3 flex items-center gap-2">
                            <UploadCloud className="w-4 h-4" /> પાસપોર્ટ સાઇઝ ફોટો
                          </label>
                          <Input type="file" accept=".jpg,.jpeg,.png" className="file:bg-primary file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1.5 file:mr-3 file:font-medium cursor-pointer h-auto py-2 px-2 w-full text-sm bg-slate-50" />
                          <p className="font-sans text-xs text-slate-500 mt-2">JPG અથવા PNG (મેક્સ. 10MB)</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-primary/30 transition-all">
                          <label className="font-sans text-base font-bold text-primary block mb-3 flex items-center gap-2">
                            <UploadCloud className="w-4 h-4" /> સહી (Signature)
                          </label>
                          <Input type="file" accept=".jpg,.jpeg,.png" className="file:bg-primary file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1.5 file:mr-3 file:font-medium cursor-pointer h-auto py-2 px-2 w-full text-sm bg-slate-50" />
                          <p className="font-sans text-xs text-slate-500 mt-2">JPG અથવા PNG (મેક્સ. 10MB)</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-primary/30 transition-all">
                          <label className="font-sans text-base font-bold text-primary block mb-3 flex items-center gap-2">
                            <UploadCloud className="w-4 h-4" /> માર્કશીટ/અન્ય દસ્તાવેજ
                          </label>
                          <Input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple className="file:bg-primary file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1.5 file:mr-3 file:font-medium cursor-pointer h-auto py-2 px-2 w-full text-sm bg-slate-50" />
                          <p className="font-sans text-xs text-slate-500 mt-2">PDF અથવા ઇમેજ (મેક્સ. 10MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Payment */}
                  <div className="border-t border-slate-100 pt-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-sm">3</div>
                      <h3 className="font-serif text-xl font-bold text-primary">ચુકવણી કરો</h3>
                      <span className="text-sm font-sans text-slate-500 font-medium">(સબમિટ કરવા માટે ફરજિયાત)</span>
                    </div>

                    <div className="bg-primary rounded-2xl overflow-hidden">
                      {/* QR Section */}
                      <div className="p-8 text-center text-white relative">
                        <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
                        <div className="relative z-10">
                          <div className="bg-white p-4 rounded-2xl w-44 h-44 mx-auto flex items-center justify-center mb-4 shadow-lg">
                            <QrCode className="w-32 h-32 text-primary" />
                          </div>
                          <h4 className="font-serif text-xl font-bold mb-1">QR કોડ સ્કેન કરો</h4>
                          <p className="font-mono text-lg tracking-widest text-secondary font-bold bg-black/30 inline-block px-5 py-1.5 rounded-lg border border-white/10">shubhamonline@upi</p>
                        </div>
                      </div>

                      {/* Payment Form */}
                      <div className="bg-white p-8 space-y-6">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start">
                          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <p className="font-sans text-sm text-amber-800 leading-relaxed">
                            <span className="font-bold flex items-center gap-1 mb-1"><IndianRupee className="w-4 h-4" /> ₹100/- સેવા ચાર્જ</span>
                            Google Pay, PhonePe, Paytm વડે QR સ્કેન કરી ચુકવણી કરો. ચુકવણી પૂર્ણ થયા પછી ટ્રાન્ઝેક્શન ID નીચે દાખલ કરો.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="txnId" className="font-sans text-base font-bold text-primary block">
                            ટ્રાન્ઝેક્શન ID / UTR નંબર <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="txnId"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="ચુકવણી પછી UTR / Transaction ID દાખલ કરો"
                            className="h-14 text-lg font-mono rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary"
                          />
                          {!transactionId.trim() && (
                            <p className="font-sans text-sm text-amber-600 flex items-center gap-1">
                              ચુકવણી કર્યા પછી Transaction ID દાખલ કરો — ત્યારે સબમિટ બટન ચાલુ થશે.
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="font-sans text-base font-bold text-primary block">
                            પેમેન્ટ સ્ક્રીનશોટ (વૈકલ્પિક)
                          </Label>
                          <Input
                            type="file"
                            accept="image/*"
                            className="file:bg-primary file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-medium cursor-pointer h-auto py-3 px-3 w-full text-base bg-slate-50 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4 flex justify-end">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-xl px-12 h-16 w-full sm:w-auto rounded-full shadow-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      disabled={isPending || !transactionId.trim()}
                      data-testid="button-submit"
                    >
                      {isPending ? (
                        <><Loader2 className="mr-3 h-6 w-6 animate-spin" /> પ્રક્રિયા ચાલુ છે...</>
                      ) : (
                        <>અરજી સબમિટ કરો</>
                      )}
                    </Button>
                  </div>

                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
}
