import { redirect } from "@/i18n/navigation";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { getCurrentUser } from "@/features/auth/actions";
import { Language } from "@/common/constants/language.constant";
import type { LocaleType } from "@/common/types/locale.type";

export default async function RegisterPage({
  params,
}: PageProps<"/[locale]/auth/register">) {
  const { locale } = await params;
  const currentUser = await getCurrentUser(Language[locale as LocaleType]);

  if (currentUser != null) {
    redirect({
      href: "/",
      locale,
    });
  }

  return <AuthForm mode="register" />;
}
