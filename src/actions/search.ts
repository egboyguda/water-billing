"use server";

import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  const term = formData.get("term");

  if (typeof term !== "string") {
    redirect("/");
  }
  redirect(`/search?term=${term}`);
}

export async function filterBills(formData: FormData) {
  const status = formData.get("status");
  const term = formData.get("term");
  if (typeof status !== "string" || typeof term !== "string") {
    redirect("/");
  }
  redirect(`/billing/search?status=${status}&term=${term}`);
}
