"use client";

import { useRef } from "react";

import type { UserListDialogVariantPropsType } from "./component.type";

import { Dialog } from "@/components/ui/Dialog";
import { ErrorVariant } from "@/features/user-lists/components/ErrorVariant";
import { ListSelectVariant } from "@/features/user-lists/components/ListSelectVariant";
import { ListCreateVariant } from "@/features/user-lists/components/ListCreateVariant";

const UserListDialogVariant = ({
  isOpen,
  title,
  onClose,
  ...rest
}: UserListDialogVariantPropsType) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <Dialog ref={dialogRef} isOpen={isOpen} title={title} onClose={onClose}>
      {rest.variant === "error" && (
        <ErrorVariant message={rest.message} onClose={onClose} />
      )}
      {rest.variant === "list-select" && (
        <ListSelectVariant
          lists={rest.lists}
          listIdToUpdate={rest.listIdToUpdate}
          onAdd={rest.onAdd}
          onRemove={rest.onRemove}
          onCreateNew={rest.onCreateNew}
        />
      )}
      {rest.variant === "list-create" && (
        <ListCreateVariant
          key={`dialog-${isOpen ? "visible" : "hidden"}`}
          {...rest}
          userListType={rest.userListType}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
};

export { UserListDialogVariant };
