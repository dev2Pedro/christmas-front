"use server";

import { cookies } from "next/headers";

export async function loginAction() {
  (await cookies()).set("admin_authenticated", "true", {
    path: "/",
  });
}
