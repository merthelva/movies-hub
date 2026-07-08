"use client";

import { useRef } from "react";

import type { AuthModalPropsType } from "./component.type";

import { useRouter } from "@/i18n/navigation";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { Dialog } from "@/components/ui/Dialog";

const AuthModal = ({ mode, redirectTo }: AuthModalPropsType) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();

  return (
    <Dialog
      ref={dialogRef}
      aria-label={mode === "login" ? "Login" : "Register"}
      isOpen
      isDismissible={false}
      onClose={router.back}
    >
      <AuthForm mode={mode} redirectTo={redirectTo} />
    </Dialog>
  );
};

export { AuthModal };
