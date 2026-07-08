"use client";

import { useActionState, useEffect } from "react";
import { useTranslations } from "next-intl";

import styles from "./styles.module.scss";
import type { EditUserListFormPropsType } from "./component.type";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Message } from "@/components/ui/Message";
import { listEditFormAction } from "@/features/user-lists/actions/form.actions";
import { INITIAL_STATE } from "@/features/user-lists/constants/form-initial-state.constant";

const EditUserListForm = ({
  listId,
  listName,
  userListType,
  onCloseEditDialog,
}: EditUserListFormPropsType) => {
  const tLists = useTranslations("Lists");
  const tCommon = useTranslations("Common");

  const [state, formAction, isPending] = useActionState(
    listEditFormAction.bind(null, listId, userListType),
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }
    onCloseEditDialog();
  }, [state]);

  return (
    <form className={styles.editUserListForm} action={formAction}>
      <Input
        aria-describedby="edit-list-name-error"
        id="edit-list-name"
        name="list-name"
        label={tLists("listName")}
        defaultValue={
          state.status === "error" ? state.formFields.name : listName
        }
        hasError={state.status === "error"}
        placeholder={tLists("listNamePlaceholder")}
      />
      {state.status === "error" && state.message && (
        <Message
          id="edit-list-name-error"
          variant="error"
          content={state.message}
        />
      )}
      <div className={styles.formActions}>
        <Button
          type="button"
          variant="ghost"
          componentSize="md"
          onClick={onCloseEditDialog}
        >
          {tCommon("cancel")}
        </Button>
        <Button
          type="submit"
          variant="primary"
          componentSize="md"
          disabled={isPending}
        >
          {isPending ? tCommon("saving") : tCommon("save")}
        </Button>
      </div>
    </form>
  );
};

export { EditUserListForm };
