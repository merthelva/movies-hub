import { getTranslations } from "next-intl/server";

import type { ProfileDetailsPropsType } from "./component.type";
import styles from "./styles.module.scss";

const ProfileDetails = async ({ email, name }: ProfileDetailsPropsType) => {
  const t = await getTranslations("Auth");
  const tProfile = await getTranslations("Profile");

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{tProfile("detailsTitle")}</h2>
      <dl className={styles.details}>
        <div className={styles.row}>
          <dt className={styles.label}>{t("name")}</dt>
          <dd className={styles.value}>{name}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>{t("email")}</dt>
          <dd className={styles.value}>{email}</dd>
        </div>
      </dl>
    </section>
  );
};

export { ProfileDetails };
