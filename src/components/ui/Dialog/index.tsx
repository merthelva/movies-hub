"use client";

import {
  useEffect,
  type KeyboardEvent,
  type MouseEvent,
  type ReactEventHandler,
} from "react";
import { X } from "lucide-react";

import type { DialogPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/Button";

const Dialog = ({
  children,
  isOpen,
  onClose,
  title,
  isDismissible = true,
  ref: dialogRef,
  ...props
}: DialogPropsType) => {
  useEffect(() => {
    const dialog = dialogRef?.current;
    if (!dialog) {
      return;
    }

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = ({ target }: MouseEvent<HTMLDialogElement>) => {
    if (!isDismissible || !dialogRef || target !== dialogRef.current) {
      return;
    }

    onClose();
  };

  const handleCancel: ReactEventHandler<HTMLDialogElement> = (event) => {
    if (!isDismissible) {
      event.preventDefault();
    }
  };

  // Chromium force-closes <dialog> on repeated ESC even if `cancel` is
  // preventDefault-ed above (refer to `handleCancel`). Stop it at
  // keydown so `cancel` never fires at all.
  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (!isDismissible && event.key === "Escape") {
      event.preventDefault();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClick={handleBackdropClick}
      onClose={onClose}
      onCancel={handleCancel}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          {!!title && <h2 className={styles.title}>{title}</h2>}
          {isDismissible && (
            <Button
              aria-label="Close dialog"
              className={styles.closeBtn}
              variant="ghost"
              onClick={onClose}
            >
              <X size={20} />
            </Button>
          )}
        </header>

        <main className={styles.body}>{children}</main>
      </div>
    </dialog>
  );
};

export { Dialog };
