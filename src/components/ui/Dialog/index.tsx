"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { DialogPropsType } from "./component.type";
import styles from "./styles.module.scss";

const Dialog = ({ children, isOpen, onClose, title }: DialogPropsType) => {
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
        <header className={styles.header}>
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
        </header>

        <main className={styles.body}>{children}</main>
      </div>
    </dialog>
  );
};

export { Dialog };
