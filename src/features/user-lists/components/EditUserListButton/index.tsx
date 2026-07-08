"use client";

import { useRef, useState } from "react";
import { Edit } from "lucide-react";
import { useTranslations } from "next-intl";

import { EditUserListForm } from "./EditUserListForm";
import type { EditUserListButtonPropsType } from "./component.type";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";

const EditUserListButton = ({
  listId,
  listName,
  userListType,
}: EditUserListButtonPropsType) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const tLists = useTranslations("Lists");

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <Button variant="ghost" onClick={handleOpenEditDialog}>
        <Edit size={20} />
      </Button>
      <Dialog
        ref={dialogRef}
        isOpen={isEditDialogOpen}
        title={tLists("editList")}
        onClose={handleCloseEditDialog}
      >
        <EditUserListForm
          key={String(isEditDialogOpen)}
          listId={listId}
          listName={listName}
          userListType={userListType}
          onCloseEditDialog={handleCloseEditDialog}
        />
      </Dialog>
    </>
  );
};

export { EditUserListButton };
