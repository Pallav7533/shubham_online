import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useAdminLogin } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LockKeyhole, FileText, Loader2, ShieldAlert } from "lucide-react";
import { Link } from "wouter";

const loginSchema = z.object({
  username: z.string().min(1, "યુઝરનેમ દાખલ કરો"),
  password: z.string().min(1, "પાસવર્ડ દાખલ કરો"),
});

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const login = useAdminLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login.mutate(
      { data },
      {
        onSuccess: (data: any) => {
          if (data?.token) sessionStorage.setItem("admin_token", data.token);
          toast({ title: "સ્વાગત છે!", description: "તમે સફળતાપૂર્વક લોગીન કર્યું છે." });
          setLocation("/admin/dashboard");
        },
        onError: () => {
          toast({ 
            title: "લોગીન નિષ્ફળ", 
            description: "ખોટું યુઝરનેમ અથવા પાસવર્ડ.", 
            variant: "destructive" 
          });
        }
      }
    );
  };

  return (
    <div className="min-h-[100dvh] bg-primary relative flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-3 group">
            <div className="bg-white/10 p-3 rounded-2xl text-secondary backdrop-blur-sm border border-white/20 transition-transform group-hover:scale-105">
              <FileText className="h-10 w-10" />
            </div>
            <span className="text-4xl font-serif font-bold text-white tracking-tight">શુભમ ઓનલાઈન</span>
          </Link>
        </div>

        <Card className="border-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-secondary via-orange-400 to-secondary"></div>
          <CardHeader className="text-center pb-8 pt-10 px-10">
            <div className="mx-auto bg-primary w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform rotate-3">
              <ShieldAlert className="w-10 h-10 text-secondary -rotate-3" />
            </div>
            <CardTitle className="font-serif text-3xl font-bold text-primary">એડમિન પેનલ</CardTitle>
            <CardDescription className="font-sans text-slate-500 text-lg mt-3">લોગીન કરવા માટે વિગતો દાખલ કરો</CardDescription>
          </CardHeader>
          
          <CardContent className="px-10 pb-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans text-sm font-bold text-slate-700 uppercase tracking-wider">યુઝરનેમ</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="admin" 
                          {...field} 
                          className="h-14 bg-slate-50 border-slate-200 text-lg rounded-xl focus-visible:ring-primary focus-visible:border-primary px-4" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans text-sm font-bold text-slate-700 uppercase tracking-wider">પાસવર્ડ</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          className="h-14 bg-slate-50 border-slate-200 text-lg rounded-xl focus-visible:ring-primary focus-visible:border-primary px-4 font-mono" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-xl font-bold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg transition-transform hover:scale-[1.02]"
                    disabled={login.isPending}
                  >
                    {login.isPending ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <LockKeyhole className="w-5 h-5 mr-2" />}
                    સુરક્ષિત લોગીન
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="mt-10 text-center">
          <Link href="/" className="inline-flex items-center text-white/60 hover:text-white transition-colors font-sans text-sm tracking-wide">
            <span className="mr-2">←</span> મુખ્ય પૃષ્ઠ પર પાછા ફરો
          </Link>
        </div>
      </div>
    </div>
  );
}