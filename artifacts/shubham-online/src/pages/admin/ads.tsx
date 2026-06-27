import { useState, useRef } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, Upload, Image as ImageIcon, PlusCircle } from "lucide-react";

interface Ad {
  id: number;
  imageUrl: string;
  title: string;
  description: string | null;
  createdAt: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
// For POST/DELETE: go directly to Render (Vercel can't proxy multipart uploads)
const API_BASE = ((import.meta.env.VITE_API_URL as string | undefined) ?? "").replace(/\/$/, "") || BASE;

const adminHeaders = (): Record<string, string> => {
  const token = sessionStorage.getItem("admin_token");
  return token ? { "x-admin-token": token } : {};
};

async function fetchAds(): Promise<Ad[]> {
  const res = await fetch(`${BASE}/api/ads`, { cache: "no-store" }); // ← cache add
  if (!res.ok) throw new Error("Failed to fetch ads");
  return res.json();
}

export default function AdminAds() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { data: ads, isLoading } = useQuery<Ad[]>({
    queryKey: ["ads"],
    queryFn: fetchAds,
  });

  const createAd = useMutation({
    mutationFn: async () => {
      if (!file || !title.trim()) throw new Error("Title and image required");
      const form = new FormData();
      form.append("image", file);
      form.append("title", title.trim());
      form.append("description", description.trim());
      const res = await fetch(`${API_BASE}/api/ads`, { method: "POST", body: form, headers: adminHeaders() });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "જાહેરાત ઉમેરાઈ", description: "નવી જાહેરાત સફળ રીતે ઉમેરાઈ." });
      queryClient.invalidateQueries({ queryKey: ["ads"] });
      setTitle("");
      setDescription("");
      setFile(null);
      setPreviewUrl(null);
      if (fileRef.current) fileRef.current.value = "";
    },
    onError: (err: any) => {
      toast({ title: "ભૂલ", description: err.message, variant: "destructive" });
    },
  });

  const deleteAd = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_BASE}/api/ads/${id}`, { method: "DELETE", headers: adminHeaders() });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      toast({ title: "કાઢી નાખ્યું" });
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
    onError: () => {
      toast({ title: "ભૂલ", description: "કાઢી નાખવામાં નિષ્ફળ", variant: "destructive" });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">જાહેરાત મેનેજમેન્ટ</h1>
          <p className="font-sans text-slate-500">હોમ પેજ પર બતાવવા માટે જાહેરાત ઉમેરો.</p>
        </div>
      </div>

      {/* Add Ad Form */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-10">
        <h2 className="font-serif text-xl font-bold text-primary mb-6 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-secondary" /> નવી જાહેરાત ઉમેરો
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Image Upload */}
          <div>
            <div
              onClick={() => fileRef.current?.click()}
              className="relative cursor-pointer border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden bg-slate-50 hover:border-primary/40 transition-colors"
              style={{ height: 200 }}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
                  <ImageIcon className="w-10 h-10" />
                  <span className="font-sans text-sm font-medium">ઈમેજ પસંદ કરો (JPG, PNG)</span>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="font-sans text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                શીર્ષક *
              </label>
              <Input
                placeholder="જાહેરાત નું શીર્ષક..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <div>
              <label className="font-sans text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                વિગત (optional)
              </label>
              <Input
                placeholder="વધુ વિગત..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <Button
              onClick={() => createAd.mutate()}
              disabled={createAd.isPending || !file || !title.trim()}
              className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold mt-2"
            >
              {createAd.isPending ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> અપલોડ થઈ રહ્યું છે...</>
              ) : (
                <><Upload className="w-4 h-4 mr-2" /> જાહેરાત ઉમેરો</>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Existing Ads */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <h2 className="font-serif text-xl font-bold text-primary mb-6">હાલની જાહેરાતો</h2>
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-secondary" />
          </div>
        ) : !ads || ads.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-sans">હજુ કોઈ જાહેરાત નથી</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad: Ad) => (
              <div key={ad.id} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm group">
                <div className="h-44 overflow-hidden bg-slate-50">
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <p className="font-serif font-bold text-primary text-base mb-1">{ad.title}</p>
                  {ad.description && (
                    <p className="font-sans text-sm text-slate-500 mb-3">{ad.description}</p>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full rounded-xl"
                    onClick={() => deleteAd.mutate(ad.id)}
                    disabled={deleteAd.isPending}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> કાઢી નાખો
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
