"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { DialogPropsType } from "./component.type";
import styles from "./styles.module.scss";
import { ErrorVariant } from "./ErrorVariant";
import { ListSelectVariant } from "./ListSelectVariant";
import { ListCreateVariant } from "./ListCreateVariant";

const Dialog = ({
  isOpen,
  onClose,
  title,
  ...variantProps
}: DialogPropsType) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isOpen) {
      dialog.showModal();
      return;
    }

    dialog.close();
  }, [isOpen]);

  const handleBackdropClick = ({ target }: MouseEvent<HTMLDialogElement>) => {
    if (target !== dialogRef.current) {
      return;
    }

    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          {!new Set([null, undefined, ""]).has(title) && (
            <h2 className={styles.title}>{title}</h2>
          )}
          <Button
            aria-label="Close dialog"
            className={styles.closeBtn}
            variant="ghost"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
        </div>

        <div className={styles.body}>
          {variantProps.variant === "error" && (
            <ErrorVariant message={variantProps.message} onClose={onClose} />
          )}
          {variantProps.variant === "list-select" && (
            <ListSelectVariant
              lists={variantProps.lists}
              movieListIds={variantProps.movieListIds}
              onAdd={variantProps.onAdd}
              onRemove={variantProps.onRemove}
            />
          )}
          {variantProps.variant === "list-create" && (
            <ListCreateVariant
              onCreate={variantProps.onCreate}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </dialog>
  );
};

export { Dialog };
