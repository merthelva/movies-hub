"use client";

import { useState } from "react";
import { Bookmark, Heart } from "lucide-react";
import { useAuth } from "@/features/auth/context";
import { UserListDialogVariant } from "@/features/user-lists/components/UserListDialogVariant";
import type { UserListType } from "@/features/user-lists/types/user-list.type";
import type { ActionButtonsPropsType } from "./component.type";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui/Button";

const ActionButtons = ({ movieId }: ActionButtonsPropsType) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userListType, setUserListType] =
    useState<UserListType>("favoritelists");

  const handleAddMovieToUserList = (userListType: UserListType) => {
    setUserListType(userListType);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const dialogTitle =
    userListType === "favoritelists" ? "Add to Favorites" : "Add to Watchlist";

  return (
    <>
      <div className={styles.actions}>
        <Button
          aria-label="Add to favorites"
          className={styles.actionBtn}
          size="sm"
          variant="ghost"
          onClick={handleAddMovieToUserList.bind(null, "favoritelists")}
        >
          <Heart size={18} />
        </Button>
        <Button
          aria-label="Add to watchlist"
          className={styles.actionBtn}
          size="sm"
          variant="ghost"
          onClick={handleAddMovieToUserList.bind(null, "watchlists")}
        >
          <Bookmark size={18} />
        </Button>
      </div>
      {user == null && (
        <UserListDialogVariant
          isOpen={isOpen}
          title={dialogTitle}
          onClose={handleClose}
          variant="error"
          message="You need to be logged in to manage your lists."
        />
      )}
      {/* TODO: Step 7 — replace with <ListMovieModal> for authenticated users */}
    </>
  );
};

export { ActionButtons };
