import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { useListRequests, useUpdateRequest, getListRequestsQueryKey } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Search, FileText, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const statusMap: Record<string, { label: string, variant: "default" | "secondary" | "destructive" | "outline", color?: string }> = {
  pending: { label: "પેન્ડિંગ", variant: "secondary", color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
  processing: { label: "પ્રક્રિયામાં", variant: "default", color: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
  completed: { label: "પૂર્ણ", variant: "outline", color: "bg-green-100 text-green-800 border-green-200" },
  rejected: { label: "રદ કરેલ", variant: "destructive" }
};

export default function AdminRequests() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedReq, setSelectedReq] = useState<any | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const queryParams = statusFilter !== "all" ? { status: statusFilter } : undefined;
  const { data: requests, isLoading } = useListRequests(queryParams);
  const updateRequest = useUpdateRequest();

  const filteredRequests = requests?.filter(req => 
    req.fullName.toLowerCase().includes(search.toLowerCase()) || 
    req.mobile.includes(search) ||
    req.id.toString() === search
  ) || [];

  const handleUpdateStatus = (newStatus: "pending" | "processing" | "completed" | "rejected") => {
    if (!selectedReq) return;
    
    updateRequest.mutate(
      { id: selectedReq.id, data: { status: newStatus } },
      {
        onSuccess: (data) => {
          toast({ title: "સ્ટેટસ અપડેટ થયું", description: `અરજી #${data.id} નું સ્ટેટસ અપડેટ કરવામાં આવ્યું છે.` });
          queryClient.invalidateQueries({ queryKey: getListRequestsQueryKey() });
          setSelectedReq({ ...selectedReq, status: newStatus });
        },
        onError: () => {
          toast({ title: "ભૂલ", description: "સ્ટેટસ અપડેટ નિષ્ફળ", variant: "destructive" });
        }
      }
    );
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">અરજીઓ મેનેજમેન્ટ</h1>
          <p className="text-slate-500 mt-1">તમામ ઓનલાઈન અરજીઓ જુઓ અને મેનેજ કરો.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="નામ, મોબાઈલ અથવા ID થી શોધો..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="સ્ટેટસ ફિલ્ટર" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">બધા સ્ટેટસ</SelectItem>
            <SelectItem value="pending">પેન્ડિંગ</SelectItem>
            <SelectItem value="processing">પ્રક્રિયામાં</SelectItem>
            <SelectItem value="completed">પૂર્ણ</SelectItem>
            <SelectItem value="rejected">રદ કરેલ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">ગ્રાહક</th>
                <th className="px-6 py-4 font-medium">સેવા</th>
                <th className="px-6 py-4 font-medium">શહેર</th>
                <th className="px-6 py-4 font-medium">તારીખ</th>
                <th className="px-6 py-4 font-medium">સ્ટેટસ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 text-base">
                    કોઈ અરજીઓ મળી નથી
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => {
                  const statusInfo = statusMap[req.status as keyof typeof statusMap] || statusMap.pending;
                  const date = new Date(req.createdAt).toLocaleDateString('gu-IN');
                  
                  return (
                    <tr 
                      key={req.id} 
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedReq(req)}
                    >
                      <td className="px-6 py-4 font-mono font-medium text-slate-600">#{req.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{req.fullName}</div>
                        <div className="text-xs text-slate-500">{req.mobile}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{req.serviceType}</td>
                      <td className="px-6 py-4 text-slate-500">{req.city}</td>
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

      <Dialog open={!!selectedReq} onOpenChange={(open) => !open && setSelectedReq(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              અરજી વિગતો <span className="text-slate-400 font-mono text-xl">#{selectedReq?.id}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedReq && new Date(selectedReq.createdAt).toLocaleString('gu-IN')}
            </DialogDescription>
          </DialogHeader>

          {selectedReq && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-500 mb-1">ગ્રાહકનું નામ</p>
                  <p className="font-semibold">{selectedReq.fullName}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-500 mb-1">મોબાઈલ</p>
                  <p className="font-semibold">{selectedReq.mobile}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-500 mb-1">સેવા</p>
                  <p className="font-semibold">{selectedReq.serviceType}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-500 mb-1">શહેર</p>
                  <p className="font-semibold">{selectedReq.city}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">વધારાની નોંધ</h3>
                <div className="bg-slate-50 p-4 rounded-lg min-h-[80px] text-slate-700">
                  {selectedReq.notes || "કોઈ નોંધ નથી."}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5" /> દસ્તાવેજો
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {/* Mock documents for display since actual file upload wasn't implemented fully */}
                  <div className="border rounded-md p-3 flex flex-col items-center justify-center gap-2 bg-slate-50">
                    <FileText className="w-8 h-8 text-slate-400" />
                    <span className="text-xs text-center text-slate-600">Aadhaar_Card.pdf</span>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center justify-center gap-2 bg-slate-50">
                    <ImageIcon className="w-8 h-8 text-slate-400" />
                    <span className="text-xs text-center text-slate-600">Photo.jpg</span>
                  </div>
                </div>
              </div>

              {selectedReq.transactionId && (
                <div>
                  <h3 className="font-bold text-lg mb-3">ચુકવણી વિગતો</h3>
                  <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                    <p className="text-sm text-green-800 mb-1">ટ્રાન્ઝેક્શન ID</p>
                    <p className="font-mono font-semibold text-green-900">{selectedReq.transactionId}</p>
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <h3 className="font-bold text-lg mb-4">સ્ટેટસ અપડેટ કરો</h3>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant={selectedReq.status === "pending" ? "default" : "outline"} 
                    className={selectedReq.status === "pending" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
                    onClick={() => handleUpdateStatus("pending")}
                    disabled={updateRequest.isPending}
                  >
                    પેન્ડિંગ
                  </Button>
                  <Button 
                    variant={selectedReq.status === "processing" ? "default" : "outline"}
                    className={selectedReq.status === "processing" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
                    onClick={() => handleUpdateStatus("processing")}
                    disabled={updateRequest.isPending}
                  >
                    પ્રક્રિયામાં
                  </Button>
                  <Button 
                    variant={selectedReq.status === "completed" ? "default" : "outline"}
                    className={selectedReq.status === "completed" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
                    onClick={() => handleUpdateStatus("completed")}
                    disabled={updateRequest.isPending}
                  >
                    પૂર્ણ
                  </Button>
                  <Button 
                    variant={selectedReq.status === "rejected" ? "destructive" : "outline"}
                    onClick={() => handleUpdateStatus("rejected")}
                    disabled={updateRequest.isPending}
                  >
                    રદ કરો
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </AdminLayout>
  );
}
