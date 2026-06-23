import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useSearch } from "wouter";
import { useCreateRequest } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import ClientLayout from "@/components/layout/ClientLayout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, FileText, ArrowRight, Loader2 } from "lucide-react";

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
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const defaultService = searchParams.get("service") || "";
  const { toast } = useToast();
  
  const createRequest = useCreateRequest();

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

  const onSubmit = (data: FormValues) => {
    createRequest.mutate(
      { data },
      {
        onSuccess: (response) => {
          toast({
            title: "અરજી સફળતાપૂર્વક નોંધાઈ છે",
            description: `અરજી નંબર: ${response.id}`,
          });
          // Note: Document upload would happen here in a real app,
          // For simplicity, we just proceed to payment
          setLocation(`/payment?id=${response.id}`);
        },
        onError: () => {
          toast({
            title: "ભૂલ",
            description: "અરજી નોંધવામાં નિષ્ફળતા. કૃપા કરીને ફરી પ્રયાસ કરો.",
            variant: "destructive"
          });
        }
      }
    );
  };

  return (
    <ClientLayout>
      {/* Header */}
      <div className="bg-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">ઓનલાઈન અરજી કરો</h1>
            <p className="font-sans text-xl text-white/80 leading-relaxed">
              તમારું ફોર્મ ભરવા માટે નીચેની માહિતી ચોકસાઈપૂર્વક દાખલ કરો અને જરૂરી દસ્તાવેજો અપલોડ કરો. અમારી ટીમ ટૂંક સમયમાં પ્રક્રિયા શરૂ કરશે.
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
              <CardDescription className="font-sans text-lg text-slate-600">બધી વિગતો ગુજરાતી અથવા અંગ્રેજીમાં ભરી શકો છો.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 sm:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-lg font-bold text-primary">પૂરું નામ <span className="text-red-500">*</span></FormLabel>
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
                          <FormLabel className="font-sans text-lg font-bold text-primary">મોબાઈલ નંબર <span className="text-red-500">*</span></FormLabel>
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
                          <FormLabel className="font-sans text-lg font-bold text-primary">ઈમેલ (વૈકલ્પિક)</FormLabel>
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
                          <FormLabel className="font-sans text-lg font-bold text-primary">શહેર/ગામ <span className="text-red-500">*</span></FormLabel>
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
                          <FormLabel className="font-sans text-lg font-bold text-primary">સેવાનો પ્રકાર <span className="text-red-500">*</span></FormLabel>
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
                          <FormLabel className="font-sans text-lg font-bold text-primary">વધારાની નોંધ (વૈકલ્પિક)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="અહીં કોઈપણ વિશેષ સૂચના લખી શકો છો..." 
                              className="min-h-[120px] resize-y text-lg rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary p-4" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="font-sans" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-10">
                    <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                      <h3 className="font-serif text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                        <div className="bg-primary p-2 rounded-lg text-white">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        દસ્તાવેજો અપલોડ
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-primary/30">
                          <label className="font-sans text-lg font-bold text-primary block mb-3">આધાર કાર્ડ</label>
                          <Input type="file" accept=".pdf,.jpg,.jpeg,.png" className="file:bg-primary file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-medium cursor-pointer h-auto py-2 px-2 w-full text-sm bg-slate-50" />
                          <p className="font-sans text-sm text-slate-500 mt-2">PDF અથવા ઇમેજ (મેક્સ. 10MB)</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-primary/30">
                          <label className="font-sans text-lg font-bold text-primary block mb-3">પાસપોર્ટ સાઇઝ ફોટો</label>
                          <Input type="file" accept=".jpg,.jpeg,.png" className="file:bg-primary file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-medium cursor-pointer h-auto py-2 px-2 w-full text-sm bg-slate-50" />
                          <p className="font-sans text-sm text-slate-500 mt-2">JPG અથવા PNG (મેક્સ. 10MB)</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-primary/30">
                          <label className="font-sans text-lg font-bold text-primary block mb-3">સહી (Signature)</label>
                          <Input type="file" accept=".jpg,.jpeg,.png" className="file:bg-primary file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-medium cursor-pointer h-auto py-2 px-2 w-full text-sm bg-slate-50" />
                          <p className="font-sans text-sm text-slate-500 mt-2">JPG અથવા PNG (મેક્સ. 10MB)</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-primary/30">
                          <label className="font-sans text-lg font-bold text-primary block mb-3">માર્કશીટ/અન્ય દસ્તાવેજ</label>
                          <Input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple className="file:bg-primary file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-medium cursor-pointer h-auto py-2 px-2 w-full text-sm bg-slate-50" />
                          <p className="font-sans text-sm text-slate-500 mt-2">PDF અથવા ઇમેજ (મેક્સ. 10MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-end">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-white font-bold text-xl px-12 h-16 w-full sm:w-auto rounded-full shadow-lg transition-transform hover:scale-105"
                      disabled={createRequest.isPending}
                    >
                      {createRequest.isPending ? (
                        <><Loader2 className="mr-3 h-6 w-6 animate-spin" /> પ્રક્રિયા ચાલુ છે...</>
                      ) : (
                        <>આગળ વધો <ArrowRight className="ml-3 w-6 h-6" /></>
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