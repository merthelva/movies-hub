import { redirect } from "next/navigation";

import { AuthForm } from "@/features/auth/components/AuthForm";
import { getCurrentUser } from "@/features/auth/actions";

export default async function RegisterPage({
  params,
}: PageProps<"/[locale]/auth/register">) {
  const { locale } = await params;
  const currentUser = await getCurrentUser();

  if (currentUser != null) {
    redirect(`/${locale}`);
  }

  return <AuthForm mode="register" />;
}
