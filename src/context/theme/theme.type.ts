export type ThemeType = "dark" | "light";

export type ThemeContextType = {
  theme: ThemeType;
  handleToggleTheme: VoidFunction;
};
