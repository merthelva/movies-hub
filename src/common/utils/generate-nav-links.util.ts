import { getTranslations } from "next-intl/server";

const generateNavLinks = (
  isAuthenticated: boolean,
  t: Awaited<ReturnType<typeof getTranslations>>,
) => {
  if (!isAuthenticated) {
    return [{ href: "/", label: t("home") }];
  }

  return [
    { href: "/", label: t("home") },
    { href: "/user/watchlists", label: t("watchlists") },
    { href: "/user/favoritelists", label: t("favoritelists") },
    { href: "/user/profile", label: t("profile") },
  ];
};

export { generateNavLinks };
