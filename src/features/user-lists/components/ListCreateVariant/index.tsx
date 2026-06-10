"use client";

import { useActionState, useEffect } from "react";

import type { ListCreateVariantPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Message } from "@/components/ui/Message";
import { listCreateFormAction } from "@/features/user-lists/actions/form.actions";
import { INITIAL_STATE } from "@/common/constants/form-initial-state.constant";

const ListCreateVariant = ({
  userListType,
  onClose,
}: ListCreateVariantPropsType) => {
  const [state, formAction, isPending] = useActionState(
    listCreateFormAction.bind(null, userListType),
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }
    onClose();
  }, [state.status, onClose]);

  return (
    <form className={styles.listCreateVariant} action={formAction}>
      <Input
        aria-describedby="list-name-error"
        id="list-name"
        name="name"
        label="List Name"
        hasError={state.status === "error"}
        placeholder="My Movie List"
      />
      {state.status === "error" && state.message && (
        <Message id="list-name-error" variant="error" content={state.message} />
      )}
      <div className={styles.formActions}>
        <Button type="button" variant="ghost" size="md" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="md" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

export { ListCreateVariant };
