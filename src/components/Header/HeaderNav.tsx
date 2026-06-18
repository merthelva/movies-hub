"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { useAuth } from "@/features/auth/context";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { NavLink } from "@/components/ui/NavLink";
import { Drawer } from "@/components/Drawer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

import styles from "./styles.module.scss";

// TODO: Static for now. Update links after all pages created
const authenticatedNavLinks = [
  { href: "/", label: "Home" },
  { href: "/user/watchlists", label: "Watchlists" },
  { href: "/user/favoritelists", label: "Favorites" },
];

const unauthenticatedNavLinks = [{ href: "/", label: "Home" }];

const HeaderNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const isAuthenticated = user != null;

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
            "Logout"
          ) : (
            "Login"
          )}
        </Button>
      </nav>

      <LanguageSwitcher />

      <ThemeToggle />

      <Button
        aria-label="Open navigation menu"
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
