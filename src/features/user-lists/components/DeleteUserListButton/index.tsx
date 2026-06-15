"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/Button";
import type { DeleteUserListButtonPropsType } from "./component.type";
import { useTransition } from "react";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

const DeleteUserListButton = ({
  listId,
  onDeleteUserList,
}: DeleteUserListButtonPropsType) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteUserList = () => {
    startTransition(async () => {
      onDeleteUserList(listId);
    });
  };

  return (
    <Button variant="ghost" onClick={handleDeleteUserList}>
      {isPending ? <LoadingIndicator /> : <Trash size={20} />}
    </Button>
  );
};

export { DeleteUserListButton };
