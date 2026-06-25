import { Router, type IRouter } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { eq, and, like, gte } from "drizzle-orm";
import { db, serviceRequestsTable, documentsTable } from "@workspace/db";
import {
  ListRequestsQueryParams,
  CreateRequestBody,
  GetRequestParams,
  UpdateRequestParams,
  UpdateRequestBody,
  UpdatePaymentParams,
  UpdatePaymentBody,
  UploadDocumentBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

const workspaceRoot = process.cwd().endsWith(path.join("artifacts", "api-server"))
  ? path.resolve(process.cwd(), "../..")
  : process.cwd();

const uploadsDir = path.resolve(workspaceRoot, "artifacts/api-server/uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, JPG, PNG allowed."));
    }
  },
});

async function getRequestWithDocs(id: number) {
  const [request] = await db
    .select()
    .from(serviceRequestsTable)
    .where(eq(serviceRequestsTable.id, id));
  if (!request) return null;

  const docs = await db
    .select()
    .from(documentsTable)
    .where(eq(documentsTable.requestId, id));

  return { ...request, documents: docs };
}

router.get("/requests", async (req, res): Promise<void> => {
  const parsed = ListRequestsQueryParams.safeParse(req.query);
  const q = parsed.success ? parsed.data : {};

  const conditions = [];
  if (q.status) conditions.push(eq(serviceRequestsTable.status, q.status));
  if (q.service) conditions.push(eq(serviceRequestsTable.serviceType, q.service));
  if (q.mobile) conditions.push(like(serviceRequestsTable.mobile, `%${q.mobile}%`));
  if (q.date) conditions.push(gte(serviceRequestsTable.createdAt, new Date(q.date)));

  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const requests = await db
    .select()
    .from(serviceRequestsTable)
    .where(where)
    .orderBy(serviceRequestsTable.createdAt);

  const requestsWithDocs = await Promise.all(
    requests.map(async (r) => {
      const docs = await db
        .select()
        .from(documentsTable)
        .where(eq(documentsTable.requestId, r.id));
      return { ...r, documents: docs };
    })
  );

  res.json(requestsWithDocs);
});

router.post("/requests", async (req, res): Promise<void> => {
  const parsed = CreateRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [request] = await db
    .insert(serviceRequestsTable)
    .values({
      fullName: parsed.data.fullName,
      mobile: parsed.data.mobile,
      email: parsed.data.email ?? null,
      city: parsed.data.city,
      serviceType: parsed.data.serviceType,
      notes: parsed.data.notes ?? null,
      status: "pending",
    })
    .returning();

  res.status(201).json({ ...request, documents: [] });
});

router.get("/requests/upload", async (_req, res): Promise<void> => {
  res.status(405).json({ error: "Use POST" });
});

router.post(
  "/requests/upload",
  upload.single("file"),
  async (req, res): Promise<void> => {
    const parsed = UploadDocumentBody.safeParse({
      requestId: Number(req.body?.requestId),
      docType: req.body?.docType,
    });

    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const [doc] = await db
      .insert(documentsTable)
      .values({
        requestId: parsed.data.requestId,
        docType: parsed.data.docType,
        filename: req.file.originalname,
        url: `/api/uploads/${req.file.filename}`,
      })
      .returning();

    res.status(201).json(doc);
  }
);

router.get("/requests/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetRequestParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const result = await getRequestWithDocs(params.data.id);
  if (!result) {
    res.status(404).json({ error: "Request not found" });
    return;
  }

  res.json(result);
});

router.patch("/requests/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateRequestParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [updated] = await db
    .update(serviceRequestsTable)
    .set({
      ...(parsed.data.status ? { status: parsed.data.status } : {}),
      ...(parsed.data.notes != null ? { notes: parsed.data.notes } : {}),
    })
    .where(eq(serviceRequestsTable.id, params.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Request not found" });
    return;
  }

  const result = await getRequestWithDocs(updated.id);
  res.json(result);
});

router.patch("/requests/:id/payment", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdatePaymentParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdatePaymentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [updated] = await db
    .update(serviceRequestsTable)
    .set({
      transactionId: parsed.data.transactionId ?? null,
      paymentScreenshot: parsed.data.paymentScreenshot ?? null,
    })
    .where(eq(serviceRequestsTable.id, params.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Request not found" });
    return;
  }

  const result = await getRequestWithDocs(updated.id);
  res.json(result);
});

export default router;