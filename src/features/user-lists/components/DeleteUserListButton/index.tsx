"use client";

import { useTransition } from "react";
import { Trash } from "lucide-react";

import type { DeleteUserListButtonPropsType } from "./component.type";

import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

const DeleteUserListButton = ({
  listId,
  onDeleteUserList,
}: DeleteUserListButtonPropsType) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteUserList = () => {
    startTransition(() => {
      onDeleteUserList(listId);
    });
  };

  return (
    <Button variant="ghost" disabled={isPending} onClick={handleDeleteUserList}>
      {isPending ? <LoadingIndicator /> : <Trash size={20} />}
    </Button>
  );
};

export { DeleteUserListButton };
