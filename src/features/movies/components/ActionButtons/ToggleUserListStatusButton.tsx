"use client";

import { Bookmark, Heart } from "lucide-react";
import { useTranslations } from "next-intl";

import type { ToggleUserListStatusButtonPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { joinClassNames } from "@/common/utils/join-classnames.util";

const ToggleUserListStatusButton = ({
  className,
  userListType,
  isLoading,
  onFetchUserListsWithMovieStatus,
  ...props
}: ToggleUserListStatusButtonPropsType) => {
  const t = useTranslations("Movie");

  const handleClick = () => {
    onFetchUserListsWithMovieStatus(userListType);
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <Button
      {...props}
      aria-label={t(
        userListType === "favoritelists"
          ? "toggleFavoritelistAriaLabel"
          : "toggleWatchlistAriaLabel",
      )}
      className={joinClassNames(styles.actionBtn, className)}
      variant="ghost"
      onClick={handleClick}
    >
      {userListType === "favoritelists" ? (
        <Heart size={20} />
      ) : (
        <Bookmark size={20} />
      )}
    </Button>
  );
};

export default ToggleUserListStatusButton;
