"use server";

import { cookies } from "next/headers";

const getAccessToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || null;
};

export { getAccessToken };
