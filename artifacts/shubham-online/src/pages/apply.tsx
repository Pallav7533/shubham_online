import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useSearch } from "wouter";
import { useCreateRequest } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import ClientLayout from "@/components/layout/ClientLayout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
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
      <div className="bg-slate-50 py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">ઓનલાઈન અરજી કરો</h1>
            <p className="text-lg text-slate-600">
              તમારું ફોર્મ ભરવા માટે નીચેની માહિતી ચોકસાઈપૂર્વક દાખલ કરો અને જરૂરી દસ્તાવેજો અપલોડ કરો.
            </p>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-primary/5 border-b pb-8">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl text-slate-900">અરજી ફોર્મ</CardTitle>
              </div>
              <CardDescription className="text-base">બધી વિગતો ગુજરાતી અથવા અંગ્રેજીમાં ભરી શકો છો.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">પૂરું નામ *</FormLabel>
                          <FormControl>
                            <Input placeholder="દા.ત. રમેશભાઈ પટેલ" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">મોબાઈલ નંબર *</FormLabel>
                          <FormControl>
                            <Input placeholder="10 આંકડાનો નંબર" maxLength={10} {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">ઈમેલ (વૈકલ્પિક)</FormLabel>
                          <FormControl>
                            <Input placeholder="દા.ત. ramesh@gmail.com" type="email" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">શહેર/ગામ *</FormLabel>
                          <FormControl>
                            <Input placeholder="દા.ત. રાજકોટ" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-base">સેવાનો પ્રકાર *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="સેવા પસંદ કરો" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {serviceOptions.map(opt => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-base">વધારાની નોંધ (વૈકલ્પિક)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="અહીં કોઈપણ વિશેષ સૂચના લખી શકો છો..." 
                              className="min-h-[100px] resize-y" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t pt-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <UploadCloud className="w-6 h-6 text-primary" />
                      દસ્તાવેજો અપલોડ
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <FormLabel className="text-base font-medium text-slate-700">આધાર કાર્ડ</FormLabel>
                        <Input type="file" accept=".pdf,.jpg,.jpeg,.png" className="file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-4 file:py-1 cursor-pointer" />
                        <FormDescription>PDF અથવા ઇમેજ (મેક્સ. 10MB)</FormDescription>
                      </div>
                      <div className="space-y-2">
                        <FormLabel className="text-base font-medium text-slate-700">પાસપોર્ટ સાઇઝ ફોટો</FormLabel>
                        <Input type="file" accept=".jpg,.jpeg,.png" className="file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-4 file:py-1 cursor-pointer" />
                      </div>
                      <div className="space-y-2">
                        <FormLabel className="text-base font-medium text-slate-700">સહી (Signature)</FormLabel>
                        <Input type="file" accept=".jpg,.jpeg,.png" className="file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-4 file:py-1 cursor-pointer" />
                      </div>
                      <div className="space-y-2">
                        <FormLabel className="text-base font-medium text-slate-700">માર્કશીટ/અન્ય દસ્તાવેજ</FormLabel>
                        <Input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple className="file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-4 file:py-1 cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-lg px-8 h-14 w-full sm:w-auto"
                      disabled={createRequest.isPending}
                    >
                      {createRequest.isPending ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> પ્રક્રિયા ચાલુ છે...</>
                      ) : (
                        <>આગળ વધો <ArrowRight className="ml-2 w-5 h-5" /></>
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
