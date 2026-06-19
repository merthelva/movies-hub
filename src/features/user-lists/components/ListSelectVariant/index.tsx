"use client";

import { useTranslations } from "next-intl";

import type { ListSelectVariantPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

const ListSelectVariant = ({
  lists,
  listIdToUpdate,
  onAdd,
  onRemove,
}: ListSelectVariantPropsType) => {
  const t = useTranslations("Common");

  return <ul className={styles.listSelectVariant}>
    {lists.map((list) => {
      const isUpdating = listIdToUpdate === list.id;
      return (
        <li key={list.id} className={styles.listSelectItem}>
          <span>{list.name}</span>
          {!isUpdating ? (
            <Button
              variant={list.hasMovie ? "secondary" : "primary"}
              componentSize="sm"
              disabled={listIdToUpdate !== null}
              onClick={
                list.hasMovie
                  ? onRemove.bind(null, list.id)
                  : onAdd.bind(null, list.id)
              }
            >
              {list.hasMovie ? t("remove") : t("add")}
            </Button>
          ) : (
            <LoadingIndicator />
          )}
        </li>
      );
    })}
  </ul>;
};

export { ListSelectVariant };
