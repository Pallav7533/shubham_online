import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearch } from "wouter";
import { useCreateRequest, useUpdatePayment } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import ClientLayout from "@/components/layout/ClientLayout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, FileText, CheckCircle2, QrCode, IndianRupee, ShieldCheck, Loader2, X, File } from "lucide-react";
import { Link } from "wouter";

const serviceOptions = [
  "કોલેજ એડમિશન ફોર્મ", "ITI એડમિશન", "પોલિટેકનિક એડમિશન", "સ્કોલરશિપ ફોર્મ", "યુનિવર્સિટી ફોર્મ",
  "PAN કાર્ડ", "પાસપોર્ટ સહાય", "આવકનો દાખલો", "જાતિનો દાખલો", "EWS પ્રમાણપત્ર", "આધાર અપડેટ",
  "GPSC ફોર્મ", "GSSSB ફોર્મ", "પોલીસ ભરતી", "રેલવે ભરતી", "બેન્ક ભરતી"
];

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE_MB = 10;

const formSchema = z.object({
  fullName: z.string().min(2, "પૂરું નામ દાખલ કરો"),
  mobile: z.string().length(10, "10 આંકડાનો મોબાઈલ નંબર દાખલ કરો").regex(/^\d+$/, "ફક્ત અંકો જ માન્ય છે"),
  email: z.string().email("યોગ્ય ઈમેલ દાખલ કરો").or(z.literal("")),
  city: z.string().min(2, "શહેરનું નામ દાખલ કરો"),
  serviceType: z.string().min(1, "સેવાનો પ્રકાર પસંદ કરો"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface DocSlot {
  docType: string;
  label: string;
  accept: string;
  file: File | null;
  error: string;
}

async function uploadFileToServer(
  file: File,
  requestId: number,
  docType: string,
  onProgress: (pct: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("requestId", String(requestId));
    formData.append("docType", docType);

    const xhr = new XMLHttpRequest();
    const API_URL = import.meta.env.VITE_API_URL;
    xhr.open(
      "POST",
      `${API_URL}/api/requests/upload`
    );

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.onload = () => {
      if (xhr.status === 201) {
        onProgress(100);
        resolve();
      } else {
        reject(new Error(`Upload failed: ${xhr.responseText}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}

export default function Apply() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const defaultService = searchParams.get("service") || "";
  const { toast } = useToast();

  const [transactionId, setTransactionId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [paymentSsFile, setPaymentSsFile] = useState<File | null>(null);
  const [paymentSsError, setPaymentSsError] = useState("");
  const paymentSsRef = useRef<HTMLInputElement | null>(null);

  const [docSlots, setDocSlots] = useState<DocSlot[]>([
    { docType: "aadhaar", label: "આધાર કાર્ડ", accept: ".pdf,.jpg,.jpeg,.png", file: null, error: "" },
    { docType: "photo", label: "પાસપોર્ટ સાઇઝ ફોટો", accept: ".jpg,.jpeg,.png", file: null, error: "" },
    { docType: "signature", label: "સહી (Signature)", accept: ".jpg,.jpeg,.png", file: null, error: "" },
    { docType: "marksheet", label: "માર્કશીટ/અન્ય દસ્તાવેજ", accept: ".pdf,.jpg,.jpeg,.png", file: null, error: "" },
  ]);

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const createRequest = useCreateRequest();
  const updatePayment = useUpdatePayment();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", mobile: "", email: "", city: "",
      serviceType: defaultService, notes: "",
    },
  });

  const handleFileSelect = (index: number, files: FileList | null) => {
    const file = files?.[0] ?? null;
    const slot = docSlots[index];
    let error = "";

    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        error = "ફક્ત PDF, JPG, PNG ફાઇલ માન્ય છે";
        if (fileInputRefs.current[index]) fileInputRefs.current[index]!.value = "";
      } else if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        error = `ફાઇલ ${MAX_SIZE_MB}MB થી મોટી ન હોવી જોઈએ`;
        if (fileInputRefs.current[index]) fileInputRefs.current[index]!.value = "";
      }
    }

    const updated = [...docSlots];
    updated[index] = { ...slot, file: error ? null : file, error };
    setDocSlots(updated);
  };

  const removeFile = (index: number) => {
    const updated = [...docSlots];
    updated[index] = { ...updated[index], file: null, error: "" };
    setDocSlots(updated);
    if (fileInputRefs.current[index]) fileInputRefs.current[index]!.value = "";
  };

  const selectedFiles = docSlots.filter((s) => s.file !== null);

  const onSubmit = async (data: FormValues) => {
    if (!transactionId.trim()) {
      toast({ title: "ભૂલ", description: "ચુકવણી કર્યા પછી ટ્રાન્ઝેક્શન ID દાખલ કરો", variant: "destructive" });
      return;
    }
    if (!paymentSsFile) {
      toast({ title: "ભૂલ", description: "ચુકવણીનો સ્ક્રીનશૉટ અપલોડ કરવો ફરજિયાત છે", variant: "destructive" });
      return;
    }

    try {
      setIsUploading(true);

      const response = await new Promise<{ id: number }>((resolve, reject) => {
        createRequest.mutate({ data }, {
          onSuccess: (res) => resolve(res as { id: number }),
          onError: reject,
        });
      });

      const requestId = response.id;

      for (const slot of docSlots) {
        if (!slot.file) continue;
        setUploadProgress((prev) => ({ ...prev, [slot.docType]: 0 }));
        await uploadFileToServer(slot.file, requestId, slot.docType, (pct) => {
          setUploadProgress((prev) => ({ ...prev, [slot.docType]: pct }));
        });
      }

      let paymentSsFilename = "";
      if (paymentSsFile) {
        setUploadProgress((prev) => ({ ...prev, payment_screenshot: 0 }));
        await uploadFileToServer(paymentSsFile, requestId, "payment_screenshot", (pct) => {
          setUploadProgress((prev) => ({ ...prev, payment_screenshot: pct }));
        });
        paymentSsFilename = paymentSsFile.name;
      }

      await new Promise<void>((resolve, reject) => {
        updatePayment.mutate(
          { id: requestId, data: { transactionId, paymentScreenshot: paymentSsFilename || transactionId } },
          { onSuccess: () => resolve(), onError: reject }
        );
      });

      setIsSuccess(true);
      toast({ title: "અરજી સફળતાપૂર્વક સબમિટ થઈ!", description: `અરજી નંબર: #${requestId}` });
    } catch {
      toast({ title: "ભૂલ", description: "અરજી સબમિટ કરવામાં ભૂલ. ફરી પ્રયાસ કરો.", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const isPending = createRequest.isPending || updatePayment.isPending || isUploading;

  if (isSuccess) {
    return (
      <ClientLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <Card className="border-0 shadow-2xl rounded-3xl text-center p-12 bg-white max-w-lg w-full overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="flex justify-center mb-8">
              <div className="bg-green-100 p-6 rounded-full text-green-500">
                <CheckCircle2 className="w-20 h-20" />
              </div>
            </div>
            <h2 className="font-serif text-4xl font-bold text-primary mb-4">અરજી સફળ!</h2>
            <p className="font-sans text-lg text-slate-600 mb-10 leading-relaxed">
              તમારી અરજી અને ચુકવણી સફળતાપૂર્વક નોંધાઈ ગઈ છે. અમારી ટીમ ટૂંક સમયમાં WhatsApp અથવા કોલ દ્વારા તમારો સંપર્ક કરશે.
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-lg font-bold shadow-lg">
              <Link href="/">મુખ્ય પૃષ્ઠ પર પાછા ફરો</Link>
            </Button>
          </Card>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="bg-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">ઓનલાઈન અરજી કરો</h1>
            <p className="font-sans text-xl text-white/80 leading-relaxed">
              ફોર્મ ભરો, દસ્તાવેજ અપલોડ કરો, ચુકવણી કરો અને સબમિટ કરો — બધું એક જ પેજ પર.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
            <CardHeader className="bg-primary/5 border-b pb-8 pt-10 px-8 sm:px-12">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-secondary p-3 rounded-xl text-primary">
                  <FileText className="w-8 h-8" />
                </div>
                <CardTitle className="font-serif text-3xl font-bold text-primary">અરજી ફોર્મ</CardTitle>
              </div>
              <CardDescription className="font-sans text-lg text-slate-600">બધી વિગતો ભરો, ચુકવણી કરો, પછી સબમિટ કરો.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 sm:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

                  {/* Step 1 */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                      <h3 className="font-serif text-xl font-bold text-primary">વ્યક્તિગત માહિતી</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-base font-bold text-primary">પૂરું નામ <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="દા.ત. રમેશભાઈ પટેલ" {...field} className="h-14 text-lg rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary" />
                          </FormControl>
                          <FormMessage className="font-sans" />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="mobile" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-base font-bold text-primary">મોબાઈલ નંબર <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="10 આંકડાનો નંબર" maxLength={10} {...field} className="h-14 text-lg rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary" />
                          </FormControl>
                          <FormMessage className="font-sans" />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-base font-bold text-primary">ઈમેલ (વૈકલ્પિક)</FormLabel>
                          <FormControl>
                            <Input placeholder="દા.ત. ramesh@gmail.com" type="email" {...field} className="h-14 text-lg rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary" />
                          </FormControl>
                          <FormMessage className="font-sans" />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-base font-bold text-primary">શહેર/ગામ <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="દા.ત. રાજકોટ" {...field} className="h-14 text-lg rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary" />
                          </FormControl>
                          <FormMessage className="font-sans" />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="serviceType" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="font-sans text-base font-bold text-primary">સેવાનો પ્રકાર <span className="text-red-500">*</span></FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-14 text-lg rounded-xl border-slate-200 focus:ring-secondary focus:border-secondary">
                                <SelectValue placeholder="સેવા પસંદ કરો" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-80">
                              {serviceOptions.map(opt => (
                                <SelectItem key={opt} value={opt} className="text-base py-3 cursor-pointer">{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="font-sans" />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="notes" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="font-sans text-base font-bold text-primary">વધારાની નોંધ (વૈકલ્પિક)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="અહીં કોઈપણ વિશેષ સૂચના લખી શકો છો..."
                              className="min-h-[100px] resize-y text-lg rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary p-4"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="font-sans" />
                        </FormItem>
                      )} />
                    </div>
                  </div>

                  {/* Step 2: Documents */}
                  <div className="border-t border-slate-100 pt-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
                      <h3 className="font-serif text-xl font-bold text-primary">દસ્તાવેજો અપલોડ</h3>
                    </div>
                    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {docSlots.map((slot, index) => (
                          <div
                            key={slot.docType}
                            className={`bg-white p-5 rounded-xl border shadow-sm transition-all ${
                              slot.file
                                ? "border-green-300 bg-green-50/30"
                                : slot.error
                                ? "border-red-300"
                                : "border-slate-200 hover:border-primary/30"
                            }`}
                          >
                            <label className="font-sans text-base font-bold text-primary block mb-3 flex items-center gap-2">
                              <UploadCloud className="w-4 h-4" /> {slot.label}
                            </label>

                            {slot.file ? (
                              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                                <File className="w-4 h-4 text-green-600 shrink-0" />
                                <span className="text-sm font-medium text-green-800 truncate flex-1">{slot.file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-green-600 hover:text-red-500 transition-colors shrink-0"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <input
                                ref={(el) => { fileInputRefs.current[index] = el; }}
                                type="file"
                                accept={slot.accept}
                                onChange={(e) => handleFileSelect(index, e.target.files)}
                                className="file:bg-primary file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1.5 file:mr-3 file:font-medium cursor-pointer h-auto py-2 px-2 w-full text-sm bg-slate-50 rounded-lg border border-slate-200"
                              />
                            )}

                            {slot.error && (
                              <p className="font-sans text-xs text-red-600 mt-2">{slot.error}</p>
                            )}

                            {uploadProgress[slot.docType] !== undefined && (
                              <div className="mt-3">
                                <Progress value={uploadProgress[slot.docType]} className="h-1.5" />
                                <p className="text-xs text-slate-500 mt-1 text-right">{uploadProgress[slot.docType]}%</p>
                              </div>
                            )}

                            {!slot.file && !slot.error && (
                              <p className="font-sans text-xs text-slate-500 mt-2">
                                {slot.accept.includes("pdf") ? "PDF અથવા ઇમેજ" : "JPG અથવા PNG"} (મેક્સ. {MAX_SIZE_MB}MB)
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {selectedFiles.length > 0 && (
                        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl px-5 py-3 flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                          <p className="font-sans text-sm text-green-800 font-medium">
                            {selectedFiles.length} ફાઇલ(ઓ) અપલોડ માટે તૈયાર — સબમિટ કરતી વખતે અપલોડ થશે
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 3: Payment */}
                  <div className="border-t border-slate-100 pt-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-sm">3</div>
                      <h3 className="font-serif text-xl font-bold text-primary">ચુકવણી કરો</h3>
                      <span className="text-sm font-sans text-slate-500 font-medium">(સબમિટ કરવા માટે ફરજિયાત)</span>
                    </div>

                    <div className="bg-primary rounded-2xl overflow-hidden">
                      <div className="p-8 text-center text-white relative">
                        <div className="absolute inset-0 bg-pattern-texture opacity-20"></div>
                        <div className="relative z-10">
                        <div className="bg-white p-2 rounded-2xl w-44 h-44 mx-auto flex items-center justify-center mb-4 shadow-lg">
  <img src="/qr-code.png" alt="QR Code" className="w-full h-full object-contain rounded-xl" />
</div>
                          <h4 className="font-serif text-xl font-bold mb-1">QR કોડ સ્કેન કરો</h4>
                          <p className="font-mono text-lg tracking-widest text-secondary font-bold bg-black/30 inline-block px-5 py-1.5 rounded-lg border border-white/10">pallavchavda@ybl</p>
                        </div>
                      </div>

                      <div className="bg-white p-8 space-y-6">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start">
                          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <p className="font-sans text-sm text-amber-800 leading-relaxed">
                            <span className="font-bold flex items-center gap-1 mb-1"><IndianRupee className="w-4 h-4" /> ₹100/- સેવા ચાર્જ</span>
                            Google Pay, PhonePe, Paytm વડે QR સ્કેન કરી ચુકવણી કરો. ચુકવણી પૂર્ણ થયા પછી ટ્રાન્ઝેક્શન ID નીચે દાખલ કરો.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="txnId" className="font-sans text-base font-bold text-primary block">
                            ટ્રાન્ઝેક્શન ID / UTR નંબર <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="txnId"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="ચુકવણી પછી UTR / Transaction ID દાખલ કરો"
                            className="h-14 text-lg font-mono rounded-xl border-slate-200 focus-visible:ring-secondary focus-visible:border-secondary"
                          />
                          {!transactionId.trim() && (
                            <p className="font-sans text-sm text-amber-600 flex items-center gap-1">
                              ચુકવણી કર્યા પછી Transaction ID દાખલ કરો — ત્યારે સબમિટ બટન ચાલુ થશે.
                            </p>
                          )}
                        </div>

                        {/* Payment Screenshot Upload */}
                        <div className="space-y-2 border-t border-slate-100 pt-6">
                          <Label className="font-sans text-base font-bold text-primary block flex items-center gap-2">
                            <UploadCloud className="w-4 h-4" />
                            ચુકવણીનો સ્ક્રીનશૉટ અપલોડ કરો
                            <span className="text-red-500 font-normal text-sm">*</span>
                          </Label>

                          {paymentSsFile ? (
                            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                              <File className="w-5 h-5 text-green-600 shrink-0" />
                              <span className="text-sm font-medium text-green-800 truncate flex-1">{paymentSsFile.name}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setPaymentSsFile(null);
                                  setPaymentSsError("");
                                  if (paymentSsRef.current) paymentSsRef.current.value = "";
                                }}
                                className="text-green-600 hover:text-red-500 transition-colors shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <input
                              ref={paymentSsRef}
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setPaymentSsError("");
                                if (file) {
                                  if (!ALLOWED_TYPES.includes(file.type)) {
                                    setPaymentSsError("ફક્ત JPG, PNG, PDF ફાઇલ માન્ય છે");
                                    e.target.value = "";
                                  } else if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                                    setPaymentSsError(`ફાઇલ ${MAX_SIZE_MB}MB થી મોટી ન હોવી જોઈએ`);
                                    e.target.value = "";
                                  } else {
                                    setPaymentSsFile(file);
                                  }
                                }
                              }}
                              className="file:bg-secondary file:text-primary file:border-0 file:rounded-lg file:px-3 file:py-1.5 file:mr-3 file:font-bold cursor-pointer h-auto py-3 px-3 w-full text-sm bg-amber-50 rounded-xl border border-amber-200 hover:border-secondary transition-colors"
                            />
                          )}

                          {paymentSsError && (
                            <p className="font-sans text-xs text-red-600">{paymentSsError}</p>
                          )}

                          {uploadProgress["payment_screenshot"] !== undefined && (
                            <div className="mt-2">
                              <Progress value={uploadProgress["payment_screenshot"]} className="h-1.5" />
                              <p className="text-xs text-slate-500 mt-1 text-right">{uploadProgress["payment_screenshot"]}%</p>
                            </div>
                          )}

                          <p className="font-sans text-xs text-slate-500">
                            Google Pay / PhonePe / Paytm ચુકવણી પછીનો સ્ક્રીનશૉટ અહીં અપલોડ કરો — admin ને ઝડપી ચકાસણી કરવામાં મદદ મળે છે.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4 flex justify-end">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-xl px-12 h-16 w-full sm:w-auto rounded-full shadow-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      disabled={isPending || !transactionId.trim()}
                      data-testid="button-submit"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                          {isUploading ? "દસ્તાવેજ અપલોડ થઈ રહ્યા છે..." : "પ્રક્રિયા ચાલુ છે..."}
                        </>
                      ) : (
                        <>અરજી સબમિટ કરો</>
                      )}
                    </Button>
                  </div>

                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
}
