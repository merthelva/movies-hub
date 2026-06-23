"use client";

import Image from "next/image";

import styles from "./styles.module.scss";

import { useTheme } from "@/hooks/useTheme.hook";

const HeaderLogo = () => {
  const { theme } = useTheme();

  return (
    <Image
      src={`/logo-${theme}.png`}
      alt="Movies Hub"
      className={styles.logo}
      width={theme === "dark" ? 108 : 112}
      height={50}
      priority
    />
  );
};

export default HeaderLogo;
