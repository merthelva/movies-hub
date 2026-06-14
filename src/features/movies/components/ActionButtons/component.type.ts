import type { ButtonPropsType } from "@/components/ui/Button/component.type";
import type { UserListType } from "@/features/user-lists/types/user-list.type";

type ActionButtonsPropsType = {
  movieId: number;
};

type ToggleUserListStatusButtonPropsType = ButtonPropsType & {
  userListType: UserListType;
  onDeferOpenDialog: VoidFunction;
  onFetchUserListsWithMovieStatus: (type: UserListType) => Promise<void>;
};

export type { ActionButtonsPropsType, ToggleUserListStatusButtonPropsType };
