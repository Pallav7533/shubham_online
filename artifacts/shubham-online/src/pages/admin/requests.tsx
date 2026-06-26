import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { useListRequests, useUpdateRequest, getListRequestsQueryKey } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Search, FileText, Image as ImageIcon, CheckCircle2, Clock, RefreshCw, XCircle, Download, ExternalLink, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const statusMap: Record<string, { label: string, badgeClass: string, icon: any }> = {
  pending: { label: "પેન્ડિંગ", badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  processing: { label: "પ્રક્રિયામાં", badgeClass: "bg-blue-100 text-blue-800 border-blue-200", icon: RefreshCw },
  completed: { label: "પૂર્ણ", badgeClass: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle2 },
  rejected: { label: "રદ કરેલ", badgeClass: "bg-red-100 text-red-800 border-red-200", icon: XCircle }
};

interface UploadedDocument {
  id: number;
  requestId: number;
  docType: string;
  filename: string;
  url: string;
}

function isPdf(doc: UploadedDocument): boolean {
  return (
    doc.filename.toLowerCase().endsWith(".pdf") ||
    doc.docType === "pdf"
  );
}

function isImage(doc: UploadedDocument): boolean {
  const name = doc.filename.toLowerCase();
  return name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png");
}

function getOpenUrl(url: string, filename: string): string {
  const isPdfFile =
    filename.toLowerCase().endsWith(".pdf") ||
    url.includes("/raw/upload/");
  if (isPdfFile) {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}`;
  }
  return url;
}

async function downloadFile(url: string, filename: string): Promise<void> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("fetch failed");
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank");
  }
}

function DocumentCard({ doc }: { doc: UploadedDocument }) {
  const [downloading, setDownloading] = useState(false);
  const openUrl = getOpenUrl(doc.url, doc.filename);
  const pdf = isPdf(doc);
  const image = isImage(doc);

  const handleDownload = async () => {
    setDownloading(true);
    await downloadFile(doc.url, doc.filename);
    setDownloading(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-primary/30 hover:shadow-md transition-all group">
      {image ? (
        <div className="h-24 bg-slate-50 border-b border-slate-100 overflow-hidden flex items-center justify-center">
          <img
            src={doc.url}
            alt={doc.filename}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      ) : (
        <div className={`h-24 flex items-center justify-center border-b border-slate-100 ${pdf ? "bg-red-50" : "bg-slate-50"}`}>
          <FileText className={`w-10 h-10 ${pdf ? "text-red-400" : "text-slate-400"}`} />
        </div>
      )}

      <div className="p-3">
        <p className="font-mono text-xs font-bold text-slate-700 truncate mb-2" title={doc.filename}>
          {doc.filename}
        </p>
        <div className="flex gap-2">
          <a
            href={openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg px-2 py-1.5 transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> ખોલો
          </a>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg px-2 py-1.5 transition-colors disabled:opacity-50"
          >
            {downloading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Download className="w-3 h-3" />
            )}
            {downloading ? "..." : "ડાઉનલોડ"}
          </button>
        </div>
      </div>
    </div>
  );
}

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">અરજીઓ મેનેજમેન્ટ</h1>
          <p className="font-sans text-slate-500">તમામ ઓનલાઈન અરજીઓ જુઓ અને સ્ટેટસ અપડેટ કરો.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8 flex flex-col sm:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="નામ, મોબાઈલ અથવા ID થી શોધો..."
            className="pl-12 h-14 bg-slate-50 border-transparent rounded-xl text-lg focus-visible:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-64 h-14 bg-slate-50 border-transparent rounded-xl text-lg font-bold text-primary focus:ring-primary">
            <SelectValue placeholder="સ્ટેટસ ફિલ્ટર" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-slate-100 shadow-xl">
            <SelectItem value="all" className="py-3 font-medium">બધા સ્ટેટસ</SelectItem>
            <SelectItem value="pending" className="py-3 font-medium text-yellow-700">પેન્ડિંગ</SelectItem>
            <SelectItem value="processing" className="py-3 font-medium text-blue-700">પ્રક્રિયામાં</SelectItem>
            <SelectItem value="completed" className="py-3 font-medium text-green-700">પૂર્ણ</SelectItem>
            <SelectItem value="rejected" className="py-3 font-medium text-red-700">રદ કરેલ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">ID</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">ગ્રાહક</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">સેવા</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">શહેર</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">દસ્તાવેજ</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">તારીખ</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">સ્ટેટસ</th>
                <th className="px-8 py-5 font-sans font-bold text-slate-400 uppercase tracking-wider text-xs">WhatsApp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-8 py-20 text-center">
                    <Loader2 className="w-10 h-10 animate-spin mx-auto text-secondary mb-4" />
                    <p className="font-sans text-slate-500 font-medium">અરજીઓ લોડ થઈ રહી છે...</p>
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-8 py-20 text-center">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-10 h-10 text-slate-300" />
                    </div>
                    <p className="font-sans text-slate-500 text-lg">કોઈ અરજીઓ મળી નથી</p>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => {
                  const statusInfo = statusMap[req.status as keyof typeof statusMap] || statusMap.pending;
                  const date = new Date(req.createdAt).toLocaleDateString('gu-IN');
                  const docCount = (req as any).documents?.length ?? 0;

                  return (
                    <tr
                      key={req.id}
                      className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                      onClick={() => setSelectedReq(req)}
                    >
                      <td className="px-8 py-6 font-mono font-bold text-slate-400 group-hover:text-primary transition-colors">#{req.id}</td>
                      <td className="px-8 py-6">
                        <div className="font-sans font-bold text-primary text-lg mb-1">{req.fullName}</div>
                        <div className="font-mono text-sm text-slate-500 bg-slate-100 px-2 py-0.5 rounded inline-block">{req.mobile}</div>
                      </td>
                      <td className="px-8 py-6 font-sans font-medium text-slate-700">{req.serviceType}</td>
                      <td className="px-8 py-6 font-sans text-slate-500">{req.city}</td>
                      <td className="px-8 py-6">
                        {docCount > 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                            <FileText className="w-3 h-3" /> {docCount} ફાઇલ
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-8 py-6 font-sans text-slate-500">{date}</td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold border ${statusInfo.badgeClass}`}>
                          <statusInfo.icon className="w-4 h-4" />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-8 py-6" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`https://wa.me/91${req.mobile.replace(/\D/g, "").replace(/^91/, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`WhatsApp ${req.mobile}`}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-80"
                          style={{ backgroundColor: "#25D366" }}
                        >
                          <MessageCircle className="w-4 h-4" /> WA
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selectedReq} onOpenChange={(open) => !open && setSelectedReq(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-0 shadow-2xl rounded-3xl">
          {selectedReq && (
            <>
              <DialogHeader className="bg-primary p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
                <div className="relative z-10">
                  <DialogTitle className="font-serif text-3xl flex items-center gap-4 mb-2">
                    અરજી વિગતો
                    <span className="font-mono text-secondary text-2xl bg-white/10 px-3 py-1 rounded-lg border border-white/20">#{selectedReq.id}</span>
                  </DialogTitle>
                  <DialogDescription className="font-sans text-white/70 text-base">
                    {new Date(selectedReq.createdAt).toLocaleString('gu-IN', { dateStyle: 'full', timeStyle: 'short' })}
                  </DialogDescription>
                </div>
              </DialogHeader>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto bg-slate-50">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="font-sans text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">ગ્રાહકનું નામ</p>
                    <p className="font-serif text-xl font-bold text-primary">{selectedReq.fullName}</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="font-sans text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">મોબાઈલ</p>
                    <div className="flex items-center gap-3">
                      <p className="font-mono text-xl font-bold text-primary">{selectedReq.mobile}</p>
                      <a
                        href={`https://wa.me/91${selectedReq.mobile.replace(/\D/g, "").replace(/^91/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: "#25D366" }}
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="font-sans text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">સેવા</p>
                    <p className="font-sans text-lg font-bold text-primary">{selectedReq.serviceType}</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="font-sans text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">શહેર</p>
                    <p className="font-sans text-lg font-bold text-primary">{selectedReq.city}</p>
                  </div>
                </div>

                {selectedReq.notes && (
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-4">વધારાની નોંધ</h3>
                    <div className="bg-yellow-50/50 p-5 rounded-2xl border border-yellow-100 min-h-[100px] text-slate-700 font-sans text-lg italic">
                      "{selectedReq.notes}"
                    </div>
                  </div>
                )}

                {/* Real Documents Section */}
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                      <FileText className="w-5 h-5" />
                    </div>
                    અપલોડ કરેલા દસ્તાવેજો
                    {selectedReq.documents?.length > 0 && (
                      <span className="text-sm font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-lg">
                        {selectedReq.documents.length} ફાઇલ
                      </span>
                    )}
                  </h3>

                  {!selectedReq.documents || selectedReq.documents.length === 0 ? (
                    <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-10 text-center">
                      <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="font-sans text-slate-500 text-lg">કોઈ દસ્તાવેજ અપલોડ કરેલ નથી</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {selectedReq.documents.map((doc: UploadedDocument) => (
                        <DocumentCard key={doc.id} doc={doc} />
                      ))}
                    </div>
                  )}
                </div>

                {selectedReq.transactionId && (
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-4">ચુકવણી વિગતો</h3>
                    <div className="bg-green-50 border-2 border-green-200 p-6 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="font-sans text-sm font-bold text-green-700 uppercase tracking-wider mb-1">ટ્રાન્ઝેક્શન ID</p>
                        <p className="font-mono text-2xl font-bold text-green-900 tracking-wider">{selectedReq.transactionId}</p>
                      </div>
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                  </div>
                )}

                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
                  <h3 className="font-serif text-2xl font-bold text-primary mb-6">અરજીનું સ્ટેટસ અપડેટ કરો</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Button
                      className={`h-14 font-bold text-base rounded-xl transition-all ${selectedReq.status === "pending" ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg scale-105" : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
                      onClick={() => handleUpdateStatus("pending")}
                      disabled={updateRequest.isPending}
                    >
                      પેન્ડિંગ
                    </Button>
                    <Button
                      className={`h-14 font-bold text-base rounded-xl transition-all ${selectedReq.status === "processing" ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg scale-105" : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
                      onClick={() => handleUpdateStatus("processing")}
                      disabled={updateRequest.isPending}
                    >
                      પ્રક્રિયામાં
                    </Button>
                    <Button
                      className={`h-14 font-bold text-base rounded-xl transition-all ${selectedReq.status === "completed" ? "bg-green-500 hover:bg-green-600 text-white shadow-lg scale-105" : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
                      onClick={() => handleUpdateStatus("completed")}
                      disabled={updateRequest.isPending}
                    >
                      પૂર્ણ
                    </Button>
                    <Button
                      className={`h-14 font-bold text-base rounded-xl transition-all ${selectedReq.status === "rejected" ? "bg-red-500 hover:bg-red-600 text-white shadow-lg scale-105" : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
                      onClick={() => handleUpdateStatus("rejected")}
                      disabled={updateRequest.isPending}
                    >
                      રદ કરો
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
