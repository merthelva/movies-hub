import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";

import { redirect } from "@/i18n/navigation";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { getCurrentUser } from "@/features/auth/actions";
import { Language } from "@/common/constants/language.constant";
import { routing } from "@/i18n/routing";

export default async function RegisterPage({
  params,
}: PageProps<"/[locale]/auth/register">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const response = await getCurrentUser(Language[locale]);

  if (response.ok) {
    redirect({
      href: "/",
      locale,
    });
  }

  return <AuthForm mode="register" />;
}
