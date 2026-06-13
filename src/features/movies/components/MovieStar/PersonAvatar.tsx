import styles from "./styles.module.scss";

const PersonAvatar = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={styles.personAvatar}
  >
    <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
  </svg>
);

export { PersonAvatar };
