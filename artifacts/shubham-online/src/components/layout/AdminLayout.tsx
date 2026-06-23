import { Link, useLocation } from "wouter";
import { LayoutDashboard, FileText, Users, LogOut } from "lucide-react";
import { useAdminLogout } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "ડેશબોર્ડ", icon: LayoutDashboard },
  { href: "/admin/requests", label: "અરજીઓ", icon: FileText },
  { href: "/admin/customers", label: "ગ્રાહકો", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const logout = useAdminLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        toast({ title: "લોગઆઉટ સફળ", description: "તમે સફળતાપૂર્વક લોગઆઉટ કર્યું છે." });
        setLocation("/admin");
      },
      onError: () => {
        toast({ title: "ભૂલ", description: "લોગઆઉટ કરવામાં નિષ્ફળતા.", variant: "destructive" });
        setLocation("/admin");
      }
    });
  };

  return (
    <div className="min-h-[100dvh] flex w-full bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded text-white">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">એડમિન પેનલ</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                  isActive 
                    ? "bg-primary/20 text-primary" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-400")} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            <LogOut className="w-5 h-5 text-slate-400" />
            લોગઆઉટ
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold">એડમિન પેનલ</span>
          </div>
          <button onClick={handleLogout} className="text-slate-400 hover:text-white">
            <LogOut className="w-5 h-5" />
          </button>
        </header>
        <div className="md:hidden bg-slate-800 p-2 flex overflow-x-auto gap-2">
           {sidebarLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 whitespace-nowrap rounded-md text-sm font-medium",
                  isActive ? "bg-primary text-white" : "text-slate-300"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
