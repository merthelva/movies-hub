import type { UserListType } from "@/features/user-lists/types/user-list.type";

type DialogListCreateFormType = {
  name: string;
};

type ListCreateVariantPropsType = {
  userListType: UserListType;
  onClose: VoidFunction;
  onSwitchToListSelect?: VoidFunction;
} & (
  | { option: "with-movie-addition"; movieId: number }
  | { option: "create-only" }
);

type DialogListCreateVariantType = ListCreateVariantPropsType & {
  variant: "list-create";
};

export type {
  DialogListCreateFormType,
  DialogListCreateVariantType,
  ListCreateVariantPropsType,
};
