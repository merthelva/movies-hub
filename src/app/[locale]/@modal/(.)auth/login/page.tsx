import { AuthModal } from "@/features/auth/components/AuthModal";
import { sanitizeRedirect } from "@/common/utils/sanitize-redirect.util";

export default async function LoginModalPage({
  searchParams,
}: PageProps<"/[locale]/auth/login">) {
  const { redirect: redirectParam } = await searchParams;
  const raw = Array.isArray(redirectParam) ? redirectParam[0] : redirectParam;
  const redirectTo = sanitizeRedirect(raw);

  return <AuthModal mode="login" redirectTo={redirectTo} />;
}
