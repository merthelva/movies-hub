import { HeaderNav } from "./HeaderNav";
import styles from "./styles.module.scss";

const Header = () => (
  <header className={styles.header}>
    <div className={styles.wrapper}>
      <HeaderNav />
    </div>
  </header>
);

export { Header };
