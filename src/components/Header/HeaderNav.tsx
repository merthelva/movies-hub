"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import styles from "./styles.module.scss";

import { generateNavLinks } from "@/common/utils/generate-nav-links.util";
import { getInitials } from "@/common/utils/get-initials.util";
import { useAuth } from "@/features/auth/context";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { NavLink } from "@/components/ui/NavLink";
import { Drawer } from "@/components/Drawer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

const HeaderNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const t = useTranslations("Common");
  const isAuthenticated = user != null;

  const navLinks = generateNavLinks(isAuthenticated, t);

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
          {navLinks.map(({ href, label }) => {
            if (href === "/user/profile") {
              return null;
            }

            return (
              <li key={href}>
                <NavLink href={href} label={label} />
              </li>
            );
          })}
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

      {isAuthenticated && (
        <NavLink href="/user/profile" className={styles.avatar}>
          {getInitials(user.name)}
        </NavLink>
      )}

      <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </>
  );
};

export { HeaderNav };
