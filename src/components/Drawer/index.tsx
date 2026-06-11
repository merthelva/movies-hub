"use client";

import { useEffect } from "react";

import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { NavLink } from "@/components/NavLink";
import { joinClassNames } from "@/common/utils/join-classnames.util";

import type { DrawerPropsType } from "./component.type";
import styles from "./styles.module.scss";
import { useAuth } from "@/features/auth/context";

// TODO: Static for now. Update links after all pages created
const authenticatedNavLinks = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/lists/watchlists", label: "Watchlists" },
  { href: "/lists/favoritelists", label: "Favorites" },
];

const unauthenticatedNavLinks = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
];

const Drawer = ({ isOpen, onClose }: DrawerPropsType) => {
  const router = useRouter();
  const { user, logout } = useAuth();
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

  const navLinks = isAuthenticated
    ? authenticatedNavLinks
    : unauthenticatedNavLinks;

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
        <nav className={styles.navList}>
          {navLinks.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} onClick={onClose} />
          ))}
        </nav>
        <div className={styles.footer}>
          <Button
            variant="primary"
            size="lg"
            onClick={isAuthenticated ? handleLogout : handleLogin}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </>
  );
};

export { Drawer };
