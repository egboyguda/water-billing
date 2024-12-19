"use server";

import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  const term = formData.get("term");
  const category = formData.get("category");

  if (typeof term !== "string") {
    redirect("/");
  }
  redirect(`/search?term=${term}`);
}
