import type { UserListType } from "@/features/user-lists/types/user-list.type";

type DialogListCreateFormType = {
  name: string;
};

type ListCreateVariantPropsType = {
  userListType: UserListType;
  onClose: VoidFunction;
};

type DialogListCreateVariantType = ListCreateVariantPropsType & {
  variant: "list-create";
  movieId: number;
  userListType: UserListType;
};

export type {
  DialogListCreateFormType,
  DialogListCreateVariantType,
  ListCreateVariantPropsType,
};
