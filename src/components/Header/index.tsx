import { HeaderNav } from "./HeaderNav";
import styles from "./styles.module.scss";

const Header = () => (
  <header className={styles.header}>
    <HeaderNav />
  </header>
);

export { Header };
