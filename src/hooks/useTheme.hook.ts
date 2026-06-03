"use client";

import { useContext } from "react";

import { ThemeContext } from "@/context/theme";
import type { ThemeContextType } from "@/context/theme/theme.type";

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export { useTheme };
