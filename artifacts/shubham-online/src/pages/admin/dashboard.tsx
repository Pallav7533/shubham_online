import AdminLayout from "@/components/layout/AdminLayout";
import { useGetAdminStats, useListRequests } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, RefreshCw, CheckCircle2, XCircle, CalendarIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

function StatCard({ title, value, icon: Icon, colorClass, isLoading }: any) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`p-4 rounded-xl ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-1" />
          ) : (
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const statusMap: Record<string, { label: string, variant: "default" | "secondary" | "destructive" | "outline", color?: string }> = {
  pending: { label: "પેન્ડિંગ", variant: "secondary", color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
  processing: { label: "પ્રક્રિયામાં", variant: "default", color: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
  completed: { label: "પૂર્ણ", variant: "outline", color: "bg-green-100 text-green-800 border-green-200" },
  rejected: { label: "રદ કરેલ", variant: "destructive" }
};

export default function AdminDashboard() {
  const { data: stats, isLoading: isStatsLoading } = useGetAdminStats();
  
  // Get recent 5 requests
  const { data: requests, isLoading: isRequestsLoading } = useListRequests();
  const recentRequests = requests?.slice(0, 5) || [];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">ડેશબોર્ડ</h1>
        <p className="text-slate-500 mt-1">અરજીઓનો એકંદર અહેવાલ.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard isLoading={isStatsLoading} title="કુલ અરજીઓ" value={stats?.total || 0} icon={FileText} colorClass="bg-slate-100 text-slate-600" />
        <StatCard isLoading={isStatsLoading} title="આજની અરજીઓ" value={stats?.today || 0} icon={CalendarIcon} colorClass="bg-indigo-100 text-indigo-600" />
        <StatCard isLoading={isStatsLoading} title="પેન્ડિંગ" value={stats?.pending || 0} icon={Clock} colorClass="bg-yellow-100 text-yellow-600" />
        <StatCard isLoading={isStatsLoading} title="પ્રક્રિયામાં" value={stats?.processing || 0} icon={RefreshCw} colorClass="bg-blue-100 text-blue-600" />
        <StatCard isLoading={isStatsLoading} title="પૂર્ણ" value={stats?.completed || 0} icon={CheckCircle2} colorClass="bg-green-100 text-green-600" />
        <StatCard isLoading={isStatsLoading} title="રદ કરેલ" value={stats?.rejected || 0} icon={XCircle} colorClass="bg-red-100 text-red-600" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">તાજેતરની અરજીઓ</h2>
          <Link href="/admin/requests" className="text-sm font-medium text-primary hover:underline">
            બધી જુઓ &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">ગ્રાહકનું નામ</th>
                <th className="px-6 py-3 font-medium">સેવા</th>
                <th className="px-6 py-3 font-medium">તારીખ</th>
                <th className="px-6 py-3 font-medium">સ્ટેટસ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isRequestsLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-8" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                  </tr>
                ))
              ) : recentRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    કોઈ અરજીઓ મળી નથી
                  </td>
                </tr>
              ) : (
                recentRequests.map((req) => {
                  const statusInfo = statusMap[req.status as keyof typeof statusMap] || statusMap.pending;
                  const date = new Date(req.createdAt).toLocaleDateString('gu-IN', { day: '2-digit', month: 'short', year: 'numeric' });
                  
                  return (
                    <tr key={req.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono font-medium text-slate-600">#{req.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{req.fullName}</td>
                      <td className="px-6 py-4 text-slate-600">{req.serviceType}</td>
                      <td className="px-6 py-4 text-slate-500">{date}</td>
                      <td className="px-6 py-4">
                        <Badge className={statusInfo.color} variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
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
