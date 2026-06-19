import { redirect } from "@/i18n/navigation";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { getCurrentUser } from "@/features/auth/actions";

export default async function RegisterPage({
  params,
}: PageProps<"/[locale]/auth/register">) {
  const { locale } = await params;
  const currentUser = await getCurrentUser();

  if (currentUser != null) {
    redirect({
      href: "/",
      locale,
    });
  }

  return <AuthForm mode="register" />;
}
