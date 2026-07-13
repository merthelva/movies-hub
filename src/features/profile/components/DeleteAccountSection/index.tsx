"use client";

import { useRef, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import type { DeleteAccountSectionPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { useAuth } from "@/features/auth/context";

const DeleteAccountSection = ({ userId }: DeleteAccountSectionPropsType) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const tProfile = useTranslations("Profile");
  const tCommon = useTranslations("Common");

  const { deleteAccount } = useAuth();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDeleteAccount = () => {
    startTransition(async () => {
      const response = await deleteAccount(userId);
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.data.message);
    });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{tProfile("deleteAccountTitle")}</h2>
      <p className={styles.description}>
        {tProfile("deleteAccountDescription")}
      </p>
      <Button variant="secondary" onClick={handleOpenDialog}>
        {tProfile("deleteAccount")}
      </Button>
      <Dialog
        ref={dialogRef}
        isOpen={isDialogOpen}
        title={tProfile("deleteAccountConfirmTitle")}
        onClose={handleCloseDialog}
        isDismissible={!isPending}
      >
        <p className={styles.confirmText}>
          {tProfile("deleteAccountConfirmBody")}
        </p>
        <div className={styles.dialogActions}>
          <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            onClick={handleCloseDialog}
          >
            {tCommon("cancel")}
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={isPending}
            onClick={handleConfirmDeleteAccount}
          >
            {isPending ? <LoadingIndicator /> : tProfile("deleteAccount")}
          </Button>
        </div>
      </Dialog>
    </section>
  );
};

export { DeleteAccountSection };
