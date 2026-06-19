"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import type { CreateUserListButtonPropsType } from "./component.type";
import { UserListDialogVariant } from "../UserListDialogVariant";

const CreateUserListButton = ({
  userListType,
}: CreateUserListButtonPropsType) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const tLists = useTranslations("Lists");
  const tCommon = useTranslations("Common");

  const isFavoritelist = userListType === "favoritelists";
  const dialogTitle = tLists(
    isFavoritelist ? "createFavoritelistTitle" : "createWatchlistTitle",
  );

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  return (
    <>
      <Button
        aria-label={tLists(
          isFavoritelist
            ? "createFavoritelistAriaLabel"
            : "createWatchlistAriaLabel",
        )}
        variant="ghost"
        onClick={handleOpenCreateDialog}
      >
        <Plus size={18} />
        <span>{tCommon("create")}</span>
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
