"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="btn-outline !px-4 !py-2 text-sm"
    >
      Keluar
    </button>
  );
}
