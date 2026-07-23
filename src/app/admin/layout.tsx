import type { Metadata } from "next";
import { AdminSessionProvider } from "@/components/admin/AdminSessionProvider";

/** /admin/* is excluded from indexing — see robots.ts (Disallow: /admin). */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: { default: "Admin", template: "%s — Admin CV Gama Putra Santosa" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-100 text-espresso-900">
      <AdminSessionProvider>{children}</AdminSessionProvider>
    </div>
  );
}
