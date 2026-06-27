import path from "path";
import fs from "fs";
import { Router, type IRouter } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { eq } from "drizzle-orm";
import { db, advertisementsTable } from "@workspace/db";
import { adminSessions } from "../lib/admin-sessions";

const router: IRouter = Router();

const UPLOADS_DIR = path.join(process.cwd(), "uploads", "ads");
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const CLOUDINARY_CONFIGURED =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET;

if (CLOUDINARY_CONFIGURED) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only image files allowed"));
  },
});

function requireAdmin(req: any, res: any, next: any) {
  const token =
    req.cookies?.admin_token ||
    req.headers["x-admin-token"] ||
    (req.headers["authorization"] || "").replace("Bearer ", "");
  if (!token || !adminSessions.has(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

async function saveImage(file: Express.Multer.File): Promise<string> {
  if (CLOUDINARY_CONFIGURED) {
    return new Promise<string>((resolve, reject) => {
      const safeName = file.originalname
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9_-]/g, "_");
      const stream = cloudinary.uploader.upload_stream(
        { folder: "shubham-online/ads", resource_type: "image", public_id: `${Date.now()}-${safeName}` },
        (err, result) => {
          if (err || !result) reject(err ?? new Error("Upload failed"));
          else resolve(result.secure_url);
        }
      );
      stream.end(file.buffer);
    });
  }

  const ext = file.mimetype === "image/png" ? ".png" :
               file.mimetype === "image/webp" ? ".webp" : ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const dest = path.join(UPLOADS_DIR, filename);
  fs.writeFileSync(dest, file.buffer);
  return `/api/uploads/ads/${filename}`;
}

router.get("/ads", async (_req, res): Promise<void> => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  const ads = await db
    .select()
    .from(advertisementsTable)
    .orderBy(advertisementsTable.createdAt);
  res.json(ads);
});

router.post(
  "/ads",
  requireAdmin,
  upload.single("image"),
  async (req, res): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ error: "Image required" });
      return;
    }
    const { title, description } = req.body;
    if (!title?.trim()) {
      res.status(400).json({ error: "Title required" });
      return;
    }

    const imageUrl = await saveImage(req.file);

    const [ad] = await db
      .insert(advertisementsTable)
      .values({ imageUrl, title: title.trim(), description: description?.trim() ?? null })
      .returning();

    res.status(201).json(ad);
  }
);

router.delete("/ads/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [ad] = await db.select().from(advertisementsTable).where(eq(advertisementsTable.id, id));
  if (ad?.imageUrl?.startsWith("/api/uploads/ads/")) {
    const filename = path.basename(ad.imageUrl);
    const filePath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  await db.delete(advertisementsTable).where(eq(advertisementsTable.id, id));
  res.json({ success: true });
});

export default router;
