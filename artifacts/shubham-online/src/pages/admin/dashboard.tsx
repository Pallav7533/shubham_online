import AdminLayout from "@/components/layout/AdminLayout";
import { useGetAdminStats, useListRequests } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, RefreshCw, CheckCircle2, XCircle, CalendarIcon, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

function StatCard({ title, value, icon: Icon, colorClass, bgClass, isLoading }: any) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl overflow-hidden relative group">
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 opacity-10 transition-transform group-hover:scale-110 ${bgClass.replace('bg-', 'bg-')}`}></div>
      <CardContent className="p-6 relative z-10 flex items-center justify-between">
        <div>
          <p className="font-sans text-sm font-bold text-slate-500 mb-2">{title}</p>
          {isLoading ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            <h3 className="font-serif text-3xl font-bold text-primary">{value}</h3>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${bgClass} ${colorClass}`}>
          <Icon className="w-7 h-7" />
        </div>
      </CardContent>
    </Card>
  );
}

const statusMap: Record<string, { label: string, badgeClass: string }> = {
  pending: { label: "પેન્ડિંગ", badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  processing: { label: "પ્રક્રિયામાં", badgeClass: "bg-blue-100 text-blue-800 border-blue-200" },
  completed: { label: "પૂર્ણ", badgeClass: "bg-green-100 text-green-800 border-green-200" },
  rejected: { label: "રદ કરેલ", badgeClass: "bg-red-100 text-red-800 border-red-200" }
};

export default function AdminDashboard() {
  const { data: stats, isLoading: isStatsLoading } = useGetAdminStats();
  
  // Get recent 5 requests
  const { data: requests, isLoading: isRequestsLoading } = useListRequests();
  const recentRequests = requests?.slice(0, 5) || [];

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">ડેશબોર્ડ</h1>
        <p className="font-sans text-slate-500">અરજીઓનો એકંદર અહેવાલ અને તાજેતરની પ્રવૃત્તિ.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard isLoading={isStatsLoading} title="કુલ અરજીઓ" value={stats?.total || 0} icon={FileText} colorClass="text-indigo-600" bgClass="bg-indigo-50" />
        <StatCard isLoading={isStatsLoading} title="આજની અરજીઓ" value={stats?.today || 0} icon={CalendarIcon} colorClass="text-blue-600" bgClass="bg-blue-50" />
        <StatCard isLoading={isStatsLoading} title="પેન્ડિંગ" value={stats?.pending || 0} icon={Clock} colorClass="text-yellow-600" bgClass="bg-yellow-50" />
        <StatCard isLoading={isStatsLoading} title="પ્રક્રિયામાં" value={stats?.processing || 0} icon={RefreshCw} colorClass="text-orange-600" bgClass="bg-orange-50" />
        <StatCard isLoading={isStatsLoading} title="પૂર્ણ" value={stats?.completed || 0} icon={CheckCircle2} colorClass="text-green-600" bgClass="bg-green-50" />
        <StatCard isLoading={isStatsLoading} title="રદ કરેલ" value={stats?.rejected || 0} icon={XCircle} colorClass="text-red-600" bgClass="bg-red-50" />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-serif text-2xl font-bold text-primary">તાજેતરની અરજીઓ</h2>
          <Link href="/admin/requests" className="inline-flex items-center text-sm font-bold text-secondary hover:text-orange-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            બધી જુઓ <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">ID</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">ગ્રાહકનું નામ</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">સેવા</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">તારીખ</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">સ્ટેટસ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isRequestsLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-8 py-6"><Skeleton className="h-5 w-12" /></td>
                    <td className="px-8 py-6"><Skeleton className="h-5 w-40" /></td>
                    <td className="px-8 py-6"><Skeleton className="h-5 w-32" /></td>
                    <td className="px-8 py-6"><Skeleton className="h-5 w-24" /></td>
                    <td className="px-8 py-6"><Skeleton className="h-8 w-24 rounded-full" /></td>
                  </tr>
                ))
              ) : recentRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="font-sans text-slate-500 text-lg">કોઈ અરજીઓ મળી નથી</p>
                  </td>
                </tr>
              ) : (
                recentRequests.map((req) => {
                  const statusInfo = statusMap[req.status as keyof typeof statusMap] || statusMap.pending;
                  const date = new Date(req.createdAt).toLocaleDateString('gu-IN', { day: '2-digit', month: 'short', year: 'numeric' });
                  
                  return (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-6 font-mono font-bold text-slate-400 group-hover:text-primary transition-colors">#{req.id}</td>
                      <td className="px-8 py-6 font-sans font-bold text-primary text-lg">{req.fullName}</td>
                      <td className="px-8 py-6 font-sans text-slate-600 font-medium">{req.serviceType}</td>
                      <td className="px-8 py-6 font-sans text-slate-500">{date}</td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${statusInfo.badgeClass}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}