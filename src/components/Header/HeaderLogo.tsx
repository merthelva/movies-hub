"use client";

import Image from "next/image";

import styles from "./styles.module.scss";

import { NavLink } from "@/components/ui/NavLink";
import { useTheme } from "@/hooks/useTheme.hook";

const HeaderLogo = () => {
  const { theme } = useTheme();

  return (
    <NavLink className={styles.logo} href="/">
      <Image
        src={`/logo-${theme}.png`}
        alt="Movies Hub"
        width={theme === "dark" ? 108 : 112}
        height={50}
        priority
      />
    </NavLink>
  );
};

export default HeaderLogo;
