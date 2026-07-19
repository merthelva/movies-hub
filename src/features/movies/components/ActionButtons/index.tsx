"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useImmer } from "use-immer";
import { toast } from "sonner";

import type { ActionButtonsPropsType } from "./component.type";
import styles from "./styles.module.scss";
import ToggleUserListStatusButton from "./ToggleUserListStatusButton";

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
import { Language } from "@/common/constants/language.constant";
import type { LocaleType } from "@/common/types/locale.type";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import type { UserListsWithMovieStatusResponseType } from "@/features/user-lists/types/service-response.type";
import type { ListSelectVariantPropsType } from "@/features/user-lists/components/ListSelectVariant/component.type";

const ActionButtons = ({ movieId }: ActionButtonsPropsType) => {
  const { user } = useAuth();
  const locale = useLocale() as LocaleType;
  const t = useTranslations("Lists");
  const [isUserListDialogOpen, setIsUserListDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"select" | "create">("select");
  const [userListType, setUserListType] =
    useState<UserListType>("favoritelists");
  const [isFetchingUserLists, setIsFetchingUserLists] = useState(false);
  const [listIdToUpdate, setListIdToUpdate] =
    useState<ListSelectVariantPropsType["listIdToUpdate"]>(null);
  const [userListsWithMovieStatus, updateUserListsWithMovieStatus] =
    useImmer<UserListsWithMovieStatusResponseType>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dialogTitle = t(
    userListType === "favoritelists"
      ? "manageFavoritelistMoviesTitle"
      : "manageWatchlistMoviesTitle",
  );

  const handleSwitchDialogMode = (mode: typeof dialogMode) => {
    setDialogMode(mode);
  };

  const handleOpenUserListDialogVariantForMovieToggle = async (
    type: UserListType,
  ) => {
    setUserListType(type);
    setDialogMode("select");

    if (user == null) {
      setIsUserListDialogOpen(true);
      return;
    }

    setIsFetchingUserLists(true);

    const getAllUserListsWithMovieStatusFn =
      type === "favoritelists"
        ? getUserFavoritelistsWithMovieStatus
        : getUserWatchlistsWithMovieStatus;

    const response = await getAllUserListsWithMovieStatusFn(movieId);
    setIsFetchingUserLists(false);
    setIsUserListDialogOpen(true);
    if (response.status === "error") {
      return setErrorMessage(serializeMessage("error", response.message));
    }

    updateUserListsWithMovieStatus(response.data);
  };

  const handleCloseUserListDialog = () => {
    setIsUserListDialogOpen(false);
    setDialogMode("select");
  };

  const handleAddMovieToUserList = async (listId: number) => {
    const addMovieToUserListFn =
      userListType === "favoritelists"
        ? addMovieToUserFavoritelist
        : addMovieToUserWatchlist;

    setListIdToUpdate(listId);

    const response = await addMovieToUserListFn(
      listId,
      movieId,
      Language[locale],
    );

    setListIdToUpdate(null);

    if (response.status === "error") {
      toast.error(response.message);
      return setErrorMessage(serializeMessage("error", response.message));
    }

    updateUserListsWithMovieStatus((draft) => {
      const matchedUserListIndex = draft.findIndex(({ id }) => id === listId);
      if (matchedUserListIndex < 0) {
        return;
      }

      draft[matchedUserListIndex].hasMovie = true;
    });
    toast.success(response.data.message);
  };

  const handleDeleteMovieFromUserList = async (listId: number) => {
    const deleteMovieFromUserListFn =
      userListType === "favoritelists"
        ? deleteMovieFromUserFavoritelist
        : deleteMovieFromUserWatchlist;

    setListIdToUpdate(listId);

    const response = await deleteMovieFromUserListFn(
      listId,
      movieId,
      Language[locale],
    );

    setListIdToUpdate(null);

    if (response.status === "error") {
      toast.error(response.message);
      return setErrorMessage(serializeMessage("error", response.message));
    }

    updateUserListsWithMovieStatus((draft) => {
      const matchedUserListIndex = draft.findIndex(({ id }) => id === listId);
      if (matchedUserListIndex < 0) {
        return;
      }

      draft[matchedUserListIndex].hasMovie = false;
    });
    toast.success(response.data.message);
  };

  return (
    <>
      <div className={styles.actions}>
        <ToggleUserListStatusButton
          userListType="favoritelists"
          disabled={userListType === "watchlists" && isFetchingUserLists}
          isLoading={userListType === "favoritelists" && isFetchingUserLists}
          onFetchUserListsWithMovieStatus={
            handleOpenUserListDialogVariantForMovieToggle
          }
        />
        <ToggleUserListStatusButton
          userListType="watchlists"
          disabled={userListType === "favoritelists" && isFetchingUserLists}
          isLoading={userListType === "watchlists" && isFetchingUserLists}
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
          message={errorMessage ?? t("loginRequired")}
        />
      )}
      {user != null &&
        dialogMode === "select" &&
        userListsWithMovieStatus.length > 0 && (
          <UserListDialogVariant
            isOpen={isUserListDialogOpen}
            title={dialogTitle}
            onClose={handleCloseUserListDialog}
            variant="list-select"
            lists={userListsWithMovieStatus}
            listIdToUpdate={listIdToUpdate}
            onAdd={handleAddMovieToUserList}
            onRemove={handleDeleteMovieFromUserList}
            onCreateNew={handleSwitchDialogMode.bind(null, "create")}
          />
        )}
      {user != null &&
        (dialogMode === "create" || userListsWithMovieStatus.length === 0) && (
          <UserListDialogVariant
            isOpen={isUserListDialogOpen}
            title={dialogTitle}
            onClose={handleCloseUserListDialog}
            variant="list-create"
            option="with-movie-addition"
            movieId={movieId}
            userListType={userListType}
            onSwitchToListSelect={
              userListsWithMovieStatus.length > 0
                ? handleSwitchDialogMode.bind(null, "select")
                : undefined
            }
          />
        )}
    </>
  );
};

export { ActionButtons };
