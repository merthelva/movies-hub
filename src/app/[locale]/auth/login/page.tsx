import { redirect } from "@/i18n/navigation";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { sanitizeRedirect } from "@/common/utils/sanitize-redirect.util";
import { getCurrentUser } from "@/features/auth/actions";

export default async function LoginPage({
  params,
  searchParams,
}: PageProps<"/[locale]/auth/login">) {
  const { locale } = await params;
  const currentUser = await getCurrentUser();

  if (currentUser != null) {
    redirect({
      href: "/",
      locale,
    });
  }

  const { redirect: redirectParam } = await searchParams;
  const raw = Array.isArray(redirectParam) ? redirectParam[0] : redirectParam;
  const redirectTo = sanitizeRedirect(raw);

  return <AuthForm mode="login" redirectTo={redirectTo} />;
}
