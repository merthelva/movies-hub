"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import type { DrawerPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { NavLink } from "@/components/ui/NavLink";
import { generateNavLinks } from "@/common/utils/generate-nav-links.util";
import { joinClassNames } from "@/common/utils/join-classnames.util";
import { useAuth } from "@/features/auth/context";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import HeaderLogo from "@/components/Header/HeaderLogo";

const Drawer = ({ isOpen, onClose }: DrawerPropsType) => {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const t = useTranslations("Common");
  const isAuthenticated = user != null;

  useEffect(() => {
    const controller = new AbortController();

    if (isOpen) {
      document.addEventListener(
        "keydown",
        (event) => {
          if (event.key === "Escape") {
            onClose();
          }
        },
        { signal: controller.signal },
      );
    }

    return () => {
      controller.abort();
    };
  }, [isOpen, onClose]);

  const navLinks = generateNavLinks(isAuthenticated, t);

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const handleLogin = () => {
    router.push("/auth/login");
    onClose();
  };

  return (
    <>
      <div
        className={joinClassNames(
          styles.backdrop,
          isOpen ? styles.backdropVisible : "",
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={joinClassNames(styles.drawer, isOpen ? styles.open : "")}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <HeaderLogo />
        <nav className={styles.navList}>
          {navLinks.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} onClick={onClose} />
          ))}
        </nav>
        <div className={styles.footer}>
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            variant="primary"
            className={styles.authBtn}
            onClick={isAuthenticated ? handleLogout : handleLogin}
          >
            {isLoading ? (
              <LoadingIndicator />
            ) : isAuthenticated ? (
              "Logout"
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export { Drawer };
