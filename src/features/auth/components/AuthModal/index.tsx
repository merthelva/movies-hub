"use client";

import { useEffect, useRef } from "react";

import { useRouter } from "@/i18n/navigation";
import { AuthForm } from "@/features/auth/components/AuthForm";
import styles from "./styles.module.scss";
import type { AuthModalPropsType } from "./component.type";

const AuthModal = ({ mode, redirectTo }: AuthModalPropsType) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={router.back}
      aria-label={mode === "login" ? "Login" : "Register"}
    >
      <AuthForm mode={mode} redirectTo={redirectTo} />
    </dialog>
  );
};

export { AuthModal };
