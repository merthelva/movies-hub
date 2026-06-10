import type { PropsWithChildren } from "react";

import styles from "./styles.module.scss";

export default function AuthLayout({ children }: PropsWithChildren) {
  return <main className={styles.page}>{children}</main>;
}
