"use client";
import { useTranslations } from "next-intl";

import type { InputWithSwitchPropsType } from "./component.type";
import styles from "../UpdateAccountForm/styles.module.scss";

import { Input } from "@/components/ui/Input";
import { MultiSwitch } from "@/components/ui/MultiSwitch";

const switchOptions = [
  {
    value: "no",
    label: "❌",
  },
  {
    value: "yes",
    label: "✔",
  },
];

const InputWithSwitch = ({
  shouldFieldUpdated,
  onSwitch,
  ...props
}: InputWithSwitchPropsType) => {
  const t = useTranslations("Profile");

  return (
    <div className={styles.formInput}>
      <Input {...props} />
      <div className={styles.updateToggle}>
        <MultiSwitch
          options={switchOptions}
          value={shouldFieldUpdated ? "yes" : "no"}
          onChange={onSwitch}
          aria-label={`Switch ${props.id} field update status`}
        />
        <span>{t("switchToUpdateField")}</span>
      </div>
    </div>
  );
};

export { InputWithSwitch };
