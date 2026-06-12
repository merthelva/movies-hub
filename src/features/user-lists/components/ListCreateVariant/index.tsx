"use client";

import { useActionState, useEffect } from "react";

import type { ListCreateVariantPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Message } from "@/components/ui/Message";
import { listCreateFormAction } from "@/features/user-lists/actions/form.actions";
import { INITIAL_STATE } from "@/features/user-lists/constants/form-initial-state.constant";

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
  }, [state.status]);

  return (
    <form className={styles.listCreateVariant} action={formAction}>
      <Input
        aria-describedby="list-name-error"
        id="list-name"
        name="list-name"
        label="List Name"
        defaultValue={state.status === "error" ? state.formFields.name : ""}
        hasError={state.status === "error"}
        placeholder="Enter [1-50] character(s)"
      />
      {state.status === "error" && state.message && (
        <Message id="list-name-error" variant="error" content={state.message} />
      )}
      <div className={styles.formActions}>
        <Button
          type="button"
          variant="ghost"
          componentSize="md"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          componentSize="md"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

export { ListCreateVariant };
