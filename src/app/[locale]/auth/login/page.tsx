import { AuthForm } from "@/features/auth/components/AuthForm";
import { sanitizeRedirect } from "@/common/utils/sanitize-redirect.util";

export default async function LoginPage({
  searchParams,
}: PageProps<"/[locale]/auth/login">) {
  const { redirect: redirectParam } = await searchParams;
  const raw = Array.isArray(redirectParam) ? redirectParam[0] : redirectParam;
  const redirectTo = sanitizeRedirect(raw);

  return <AuthForm mode="login" redirectTo={redirectTo} />;
}
