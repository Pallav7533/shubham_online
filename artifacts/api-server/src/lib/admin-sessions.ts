import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SESSION_SECRET ?? "shubham-admin-secret-2024";
const JWT_EXPIRES = "7d";

export function signAdminToken(): string {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function verifyAdminToken(token: string): boolean {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    return payload?.role === "admin";
  } catch {
    return false;
  }
}

export const adminSessions = new Set<string>();
