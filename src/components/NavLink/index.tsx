"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { joinClassNames } from "@/common/utils/join-classnames.util";

import type { NavLinkPropsType } from "./component.type";
import styles from "./styles.module.scss";
import { checkIsLinkActive } from "./check-is-link-active.util";

const NavLink = ({
  children,
  className,
  href,
  label,
  onClick,
}: NavLinkPropsType) => {
  // current URL path (locale-stripped)
  const pathname = usePathname();

  const isActive = checkIsLinkActive(pathname, href);

  return (
    <Link
      href={href}
      className={joinClassNames(
        styles.navLink,
        className,
        isActive ? styles.active : "",
      )}
      onClick={onClick}
    >
      {children ?? label}
    </Link>
  );
};

export { NavLink };
