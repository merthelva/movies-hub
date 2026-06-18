"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import type { CreateUserListButtonPropsType } from "./component.type";
import { UserListDialogVariant } from "../UserListDialogVariant";

const CreateUserListButton = ({
  userListType,
}: CreateUserListButtonPropsType) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const dialogTitle = `Create ${userListType === "favoritelists" ? "Favoritelist" : "Watchlist"}`;

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  return (
    <>
      <Button
        aria-label={`Create new ${userListType === "favoritelists" ? "favoritelist" : "watchlist"}`}
        variant="ghost"
        onClick={handleOpenCreateDialog}
      >
        <Plus size={18} />
        <span>Create</span>
      </Button>
      <UserListDialogVariant
        isOpen={isCreateDialogOpen}
        title={dialogTitle}
        onClose={handleCloseCreateDialog}
        variant="list-create"
        option="create-only"
        userListType={userListType}
      />
    </>
  );
};

export { CreateUserListButton };
