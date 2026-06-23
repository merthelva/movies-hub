import HeaderLogo from "./HeaderLogo";
import { HeaderNav } from "./HeaderNav";
import styles from "./styles.module.scss";

import { joinClassNames } from "@/common/utils/join-classnames.util";

const Header = () => (
  <header className={styles.header}>
    <div className={joinClassNames("fluid-wrapper", styles.wrapper)}>
      <HeaderLogo />
      <HeaderNav />
    </div>
  </header>
);

export { Header };
