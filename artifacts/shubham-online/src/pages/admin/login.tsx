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
import { LockKeyhole, FileText, Loader2 } from "lucide-react";
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
        onSuccess: () => {
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg text-white shadow-sm">
            <FileText className="h-8 w-8" />
          </div>
          <span className="text-3xl font-bold text-primary">શુભમ ઓનલાઈન</span>
        </Link>
      </div>

      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center pb-8 pt-10">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <LockKeyhole className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">એડમિન પેનલ</CardTitle>
          <CardDescription className="text-base mt-2">લોગીન કરવા માટે વિગતો દાખલ કરો</CardDescription>
        </CardHeader>
        <CardContent className="px-10 pb-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>યુઝરનેમ</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} className="h-12" />
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
                    <FormLabel>પાસવર્ડ</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full h-12 text-lg"
                disabled={login.isPending}
              >
                {login.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                લોગીન કરો
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-slate-500 text-sm">
        <Link href="/" className="hover:text-primary hover:underline">← મુખ્ય પૃષ્ઠ પર પાછા ફરો</Link>
      </p>
    </div>
  );
}
