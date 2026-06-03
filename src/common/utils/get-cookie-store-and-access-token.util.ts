import "server-only";

import { cookies } from "next/headers";

const getCookieStoreAndAccessToken = async (): Promise<
  [Awaited<ReturnType<typeof cookies>>, string | null]
> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value || null;
  return [cookieStore, token];
};

export { getCookieStoreAndAccessToken };
