import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, serviceRequestsTable } from "@workspace/db";
import { AdminLoginBody } from "@workspace/api-zod";
import { adminSessions } from "../lib/admin-sessions";

const router: IRouter = Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "shubham2024";

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (
    parsed.data.username !== ADMIN_USERNAME ||
    parsed.data.password !== ADMIN_PASSWORD
  ) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return;
  }

  const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  adminSessions.add(token);
  res.cookie("admin_token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "lax",
  });

  res.json({ success: true, message: "Login successful", token });
});

router.post("/admin/logout", async (req, res): Promise<void> => {
  const token = req.cookies?.admin_token;
  if (token) adminSessions.delete(token);
  res.clearCookie("admin_token");
  res.json({ success: true, message: "Logged out" });
});

router.get("/admin/stats", async (_req, res): Promise<void> => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const rows = await db
    .select({
      status: serviceRequestsTable.status,
      count: sql<number>`count(*)::int`,
    })
    .from(serviceRequestsTable)
    .groupBy(serviceRequestsTable.status);

  const todayRows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(serviceRequestsTable)
    .where(sql`${serviceRequestsTable.createdAt} >= ${todayStart}`);

  const stats = {
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    rejected: 0,
    today: todayRows[0]?.count ?? 0,
  };

  for (const row of rows) {
    stats.total += row.count;
    if (row.status === "pending") stats.pending = row.count;
    else if (row.status === "processing") stats.processing = row.count;
    else if (row.status === "completed") stats.completed = row.count;
    else if (row.status === "rejected") stats.rejected = row.count;
  }

  res.json(stats);
});

export default router;