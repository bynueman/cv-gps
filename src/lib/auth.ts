import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

/**
 * Simple in-memory login rate limit — 5 attempts / 15 min per IP.
 * Resets on server restart; good enough for a single admin account on
 * a single VPS, not meant to survive a distributed/serverless deploy.
 */
const ATTEMPT_LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= ATTEMPT_LIMIT) return false;
  entry.count += 1;
  return true;
}

function clientIp(req: { headers?: Record<string, string> } | undefined): string {
  const forwarded = req?.headers?.["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const ip = clientIp(req as { headers?: Record<string, string> });
        if (!checkRateLimit(ip)) {
          throw new Error("Terlalu banyak percobaan. Coba lagi dalam 15 menit.");
        }

        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.adminUser.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { id?: string }).id = token.id as string;
      return session;
    },
  },
};
