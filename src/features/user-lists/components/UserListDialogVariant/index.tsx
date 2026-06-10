import type { UserListDialogVariantPropsType } from "./component.type";

import { Dialog } from "@/components/ui/Dialog";
import { ErrorVariant } from "@/features/user-lists/components/ErrorVariant";
import { ListSelectVariant } from "@/features/user-lists/components/ListSelectVariant";
import { ListCreateVariant } from "@/features/user-lists/components/ListCreateVariant";

const UserListDialogVariant = ({
  isOpen,
  title,
  onClose,
  userListType,
  ...rest
}: UserListDialogVariantPropsType) => {
  return (
    <Dialog isOpen={isOpen} title={title} onClose={onClose}>
      {rest.variant === "error" && (
        <ErrorVariant message={rest.message} onClose={onClose} />
      )}
      {rest.variant === "list-select" && (
        <ListSelectVariant
          lists={rest.lists}
          movieListIds={rest.movieListIds}
          onAdd={rest.onAdd}
          onRemove={rest.onRemove}
        />
      )}
      {rest.variant === "list-create" && (
        <ListCreateVariant userListType={userListType} onClose={onClose} />
      )}
    </Dialog>
  );
};

export { UserListDialogVariant };
