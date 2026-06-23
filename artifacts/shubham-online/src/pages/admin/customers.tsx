import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { useListRequests } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Loader2, Search, User } from "lucide-react";

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">ગ્રાહકોની યાદી</h1>
          <p className="text-slate-500 mt-1">અગાઉ સેવા લીધેલ તમામ ગ્રાહકોની માહિતી.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="નામ, મોબાઈલ અથવા શહેરથી શોધો..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">નામ</th>
                <th className="px-6 py-4 font-medium">સંપર્ક</th>
                <th className="px-6 py-4 font-medium">શહેર</th>
                <th className="px-6 py-4 font-medium">જોડાયાની તારીખ</th>
                <th className="px-6 py-4 font-medium">કુલ અરજીઓ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-base">
                    કોઈ ગ્રાહક મળ્યા નથી
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded-full text-slate-500">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-slate-900">{customer.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">{customer.mobile}</div>
                      <div className="text-xs text-slate-500">{customer.email || "-"}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{customer.city}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(customer.firstRequest).toLocaleDateString('gu-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium text-xs">
                        {customer.totalRequests} અરજીઓ
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
