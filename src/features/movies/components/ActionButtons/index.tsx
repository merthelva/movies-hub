"use client";

import { useState } from "react";

import { useAuth } from "@/features/auth/context";
import { UserListDialogVariant } from "@/features/user-lists/components/UserListDialogVariant";
import {
  addMovieToUserFavoritelist,
  addMovieToUserWatchlist,
  deleteMovieFromUserFavoritelist,
  deleteMovieFromUserWatchlist,
  getUserFavoritelistsWithMovieStatus,
  getUserWatchlistsWithMovieStatus,
} from "@/features/user-lists/services";
import type { UserListType } from "@/features/user-lists/types/user-list.type";
import type { ActionButtonsPropsType } from "./component.type";
import styles from "./styles.module.scss";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import type { UserListsWithMovieStatusResponseType } from "@/features/user-lists/types/service-response.type";
import { useImmer } from "use-immer";
import type { ListSelectVariantPropsType } from "@/features/user-lists/components/ListSelectVariant/component.type";
import ToggleUserListStatusButton from "./ToggleUserListStatusButton";

const ActionButtons = ({ movieId }: ActionButtonsPropsType) => {
  const { user } = useAuth();
  const [isUserListDialogOpen, setIsUserListDialogOpen] = useState(false);
  const [userListType, setUserListType] =
    useState<UserListType>("favoritelists");
  const [listIdToUpdate, setlistIdToUpdate] =
    useState<ListSelectVariantPropsType["listIdToUpdate"]>(null);
  const [userListsWithMovieStatus, updateUserListsWithMovieStatus] =
    useImmer<UserListsWithMovieStatusResponseType>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dialogTitle =
    userListType === "favoritelists" ? "Add to Favorites" : "Add to Watchlist";

  const handleOpenUserListDialogVariantForMovieToggle = async (
    type: UserListType,
  ) => {
    setUserListType(type);

    if (user == null) {
      setIsUserListDialogOpen(true);
      return;
    }

    const getAllUserListsWithMovieStatusFn =
      type === "favoritelists"
        ? getUserFavoritelistsWithMovieStatus
        : getUserWatchlistsWithMovieStatus;

    const response = await getAllUserListsWithMovieStatusFn(movieId);

    if (response.status === "error") {
      return setErrorMessage(serializeMessage("error", response.message));
    }

    updateUserListsWithMovieStatus(response.data);
  };

  const handleOpenUserListDialog = () => {
    setIsUserListDialogOpen(true);
  };

  const handleCloseUserListDialog = () => {
    setIsUserListDialogOpen(false);
  };

  const handleAddMovieToUserList = async (listId: number) => {
    const addMovieToUserListFn =
      userListType === "favoritelists"
        ? addMovieToUserFavoritelist
        : addMovieToUserWatchlist;

    setlistIdToUpdate(listId);

    const response = await addMovieToUserListFn(listId, movieId);

    setlistIdToUpdate(null);

    if (response.status === "error") {
      return setErrorMessage(serializeMessage("error", response.message));
    }

    updateUserListsWithMovieStatus((draft) => {
      const matchedUserListIndex = draft.findIndex(({ id }) => id === listId);
      if (matchedUserListIndex < 0) {
        return;
      }

      draft[matchedUserListIndex].hasMovie = true;
    });
  };

  const handleDeleteMovieFromUserList = async (listId: number) => {
    const deleteMovieFromUserListFn =
      userListType === "favoritelists"
        ? deleteMovieFromUserFavoritelist
        : deleteMovieFromUserWatchlist;

    setlistIdToUpdate(listId);

    const response = await deleteMovieFromUserListFn(listId, movieId);

    setlistIdToUpdate(null);

    if (response.status === "error") {
      return setErrorMessage(serializeMessage("error", response.message));
    }

    updateUserListsWithMovieStatus((draft) => {
      const matchedUserListIndex = draft.findIndex(({ id }) => id === listId);
      if (matchedUserListIndex < 0) {
        return;
      }

      draft[matchedUserListIndex].hasMovie = false;
    });
  };

  return (
    <>
      <div className={styles.actions}>
        <ToggleUserListStatusButton
          userListType="favoritelists"
          onDeferOpenDialog={handleOpenUserListDialog}
          onFetchUserListsWithMovieStatus={
            handleOpenUserListDialogVariantForMovieToggle
          }
        />
        <ToggleUserListStatusButton
          userListType="watchlists"
          onDeferOpenDialog={handleOpenUserListDialog}
          onFetchUserListsWithMovieStatus={
            handleOpenUserListDialogVariantForMovieToggle
          }
        />
      </div>
      {(user == null || errorMessage) && (
        <UserListDialogVariant
          isOpen={isUserListDialogOpen}
          title={dialogTitle}
          onClose={handleCloseUserListDialog}
          variant="error"
          message={
            errorMessage ?? "You need to be logged in to manage your lists."
          }
        />
      )}
      {user != null && userListsWithMovieStatus.length > 0 && (
        <UserListDialogVariant
          isOpen={isUserListDialogOpen}
          title={dialogTitle}
          onClose={handleCloseUserListDialog}
          variant="list-select"
          lists={userListsWithMovieStatus}
          listIdToUpdate={listIdToUpdate}
          onAdd={handleAddMovieToUserList}
          onRemove={handleDeleteMovieFromUserList}
        />
      )}
      {user != null && userListsWithMovieStatus.length === 0 && (
        <UserListDialogVariant
          isOpen={isUserListDialogOpen}
          title={dialogTitle}
          onClose={handleCloseUserListDialog}
          variant="list-create"
          movieId={movieId}
          userListType={userListType}
        />
      )}
    </>
  );
};

export { ActionButtons };
