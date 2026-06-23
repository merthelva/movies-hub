"use client";

import { Sun, Moon } from "lucide-react";

import styles from "./styles.module.scss";

import { useTheme } from "@/hooks/useTheme.hook";
import { Button } from "@/components/ui/Button";

const ThemeToggle = () => {
  const { theme, handleToggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={styles.toggle}
      variant="secondary"
      componentSize="sm"
      onClick={handleToggleTheme}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
};

export { ThemeToggle };
