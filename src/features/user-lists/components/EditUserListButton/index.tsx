"use client";

import { useActionState, useEffect, useState } from "react";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { Message } from "@/components/ui/Message";
import { listEditFormAction } from "@/features/user-lists/actions/form.actions";
import { INITIAL_STATE } from "@/features/user-lists/constants/form-initial-state.constant";
import type { EditUserListButtonPropsType } from "./component.type";
import styles from "./styles.module.scss";

const EditUserListButton = ({
  listId,
  listName,
  userListType,
}: EditUserListButtonPropsType) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    listEditFormAction.bind(null, listId, userListType),
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }
    handleCloseEditDialog();
  }, [state]);

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <Button variant="ghost" onClick={handleOpenEditDialog}>
        {isPending ? <LoadingIndicator /> : <Edit size={20} />}
      </Button>
      <Dialog
        isOpen={isEditDialogOpen}
        title="Edit List"
        onClose={handleCloseEditDialog}
      >
        <form className={styles.editUserListForm} action={formAction}>
          <Input
            aria-describedby="edit-list-name-error"
            id="edit-list-name"
            name="list-name"
            label="List Name"
            defaultValue={
              state.status === "error" ? state.formFields.name : listName
            }
            hasError={state.status === "error"}
            placeholder="Enter [1-50] character(s)"
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
              onClick={handleCloseEditDialog}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              componentSize="md"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export { EditUserListButton };
