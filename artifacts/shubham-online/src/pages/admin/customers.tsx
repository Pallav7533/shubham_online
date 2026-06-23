import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { useListRequests } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Loader2, Search, User, MapPin, Calendar, FileText } from "lucide-react";

export default function AdminCustomers() {
  const [search, setSearch] = useState("");
  const { data: requests, isLoading } = useListRequests();

  // Extract unique customers from requests based on mobile number
  const uniqueCustomersMap = new Map();
  
  if (requests) {
    requests.forEach(req => {
      if (!uniqueCustomersMap.has(req.mobile)) {
        uniqueCustomersMap.set(req.mobile, {
          fullName: req.fullName,
          mobile: req.mobile,
          email: req.email,
          city: req.city,
          firstRequest: req.createdAt,
          totalRequests: 1
        });
      } else {
        const customer = uniqueCustomersMap.get(req.mobile);
        customer.totalRequests += 1;
      }
    });
  }

  const customers = Array.from(uniqueCustomersMap.values());

  const filteredCustomers = customers.filter(c => 
    c.fullName.toLowerCase().includes(search.toLowerCase()) || 
    c.mobile.includes(search) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">ગ્રાહકોની યાદી</h1>
          <p className="font-sans text-slate-500">અગાઉ સેવા લીધેલ તમામ ગ્રાહકોની માહિતી.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input 
            placeholder="નામ, મોબાઈલ અથવા શહેરથી શોધો..." 
            className="pl-12 h-14 bg-slate-50 border-transparent rounded-xl text-lg focus-visible:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">નામ</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">સંપર્ક</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">શહેર</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">જોડાયાની તારીખ</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">કુલ અરજીઓ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <Loader2 className="w-10 h-10 animate-spin mx-auto text-secondary mb-4" />
                    <p className="font-sans text-slate-500 font-medium">માહિતી લોડ થઈ રહી છે...</p>
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-slate-300" />
                    </div>
                    <p className="font-sans text-slate-500 text-lg">કોઈ ગ્રાહક મળ્યા નથી</p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <User className="w-5 h-5" />
                        </div>
                        <span className="font-sans font-bold text-primary text-lg">{customer.fullName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-mono font-bold text-slate-700 text-base">{customer.mobile}</div>
                      <div className="text-sm text-slate-500 mt-1">{customer.email || "-"}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <MapPin className="w-4 h-4 text-slate-400" /> {customer.city}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {new Date(customer.firstRequest).toLocaleDateString('gu-IN')}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 px-4 py-1.5 rounded-full font-bold text-sm">
                        <FileText className="w-4 h-4" /> {customer.totalRequests}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}