"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import { useAuth } from "@/features/auth/context";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { NavLink } from "@/components/ui/NavLink";
import { Drawer } from "@/components/Drawer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

import styles from "./styles.module.scss";

const HeaderNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const t = useTranslations("Common");
  const isAuthenticated = user != null;

  const authenticatedNavLinks = [
    { href: "/", label: t("home") },
    { href: "/user/watchlists", label: t("watchlists") },
    { href: "/user/favoritelists", label: t("favoritelists") },
  ];

  const unauthenticatedNavLinks = [{ href: "/", label: t("home") }];

  const navLinks = isAuthenticated
    ? authenticatedNavLinks
    : unauthenticatedNavLinks;

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <NavLink href={href} label={label} />
            </li>
          ))}
        </ul>
        <Button
          variant="primary"
          onClick={isAuthenticated ? logout : handleLogin}
        >
          {isLoading ? (
            <LoadingIndicator />
          ) : isAuthenticated ? (
            t("logout")
          ) : (
            t("login")
          )}
        </Button>
      </nav>

      <LanguageSwitcher />

      <ThemeToggle />

      <Button
        aria-label={t("openNavMenu")}
        aria-expanded={isDrawerOpen}
        variant="ghost"
        className={styles.burgerBtn}
        onClick={handleOpenDrawer}
      >
        <Menu />
      </Button>

      <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </>
  );
};

export { HeaderNav };
