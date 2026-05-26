"use client";

import { useContext } from "react";

import { ThemeContext } from "@/context/theme/ThemeContext";
import type { ThemeContextType } from "@/context/theme/types";

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export { useTheme };
