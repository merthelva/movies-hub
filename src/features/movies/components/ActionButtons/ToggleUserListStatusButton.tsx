import { useTransition } from "react";
import { Bookmark, Heart } from "lucide-react";

import styles from "./styles.module.scss";
import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { joinClassNames } from "@/common/utils/join-classnames.util";
import type { ToggleUserListStatusButtonPropsType } from "./component.type";

const ToggleUserListStatusButton = ({
  className,
  userListType,
  onDeferOpenDialog,
  onFetchUserListsWithMovieStatus,
  ...props
}: ToggleUserListStatusButtonPropsType) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(onDeferOpenDialog);
    onFetchUserListsWithMovieStatus(userListType);
  };

  return isPending ? (
    <LoadingIndicator />
  ) : (
    <Button
      {...props}
      aria-label={`Toggle movie status for user ${userListType}`}
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
