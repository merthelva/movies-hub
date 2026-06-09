"use client";

import { createContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import type { ThemeContextType, ThemeType } from "./theme.type";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as ThemeType | null;
    setTheme(storedTheme ?? "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
