"use client";

import { useTranslations } from "next-intl";

import type { ErrorVariantPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/Button";

const ErrorVariant = ({ message, onClose }: ErrorVariantPropsType) => {
  const t = useTranslations("Common");

  return (
    <div className={styles.errorVariant}>
      <p className={styles.errorMessage}>{message}</p>
      <Button variant="primary" componentSize="md" onClick={onClose}>
        {t("close")}
      </Button>
    </div>
  );
};

export { ErrorVariant };
