import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import styles from "./styles.module.scss";

import { Alert } from "@/components/ui/Alert";
import { ScrollToTop } from "@/components/ScrollToTop";
import { getCurrentUser } from "@/features/auth/actions";
import { ProfileDetails } from "@/features/profile/components/ProfileDetails";
import { UpdateAccountForm } from "@/features/profile/components/UpdateAccountForm";
import { DeleteAccountSection } from "@/features/profile/components/DeleteAccountSection";
import { Language } from "@/common/constants/language.constant";
import { routing } from "@/i18n/routing";

export default async function ProfilePage({
  params,
}: PageProps<"/[locale]/user/profile">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations("Profile");
  const response = await getCurrentUser(Language[locale]);

  if (!response.ok) {
    return (
      <Alert
        content={response.message || t("fetchProfileError")}
        variant="error"
      />
    );
  }

  return (
    <div className={styles.page}>
      <ScrollToTop />
      <h1 className={styles.title}>{t("title")}</h1>
      <ProfileDetails email={response.user.email} name={response.user.name} />
      <UpdateAccountForm
        id={response.user.id}
        email={response.user.email}
        name={response.user.name}
      />
      <DeleteAccountSection userId={response.user.id} />
    </div>
  );
}
