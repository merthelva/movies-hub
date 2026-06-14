import type { UserListType } from "@/features/user-lists/types/user-list.type";

type DialogListCreateFormType = {
  name: string;
};

type ListCreateVariantPropsType = {
  movieId: number;
  userListType: UserListType;
  onClose: VoidFunction;
};

type DialogListCreateVariantType = ListCreateVariantPropsType & {
  variant: "list-create";
};

export type {
  DialogListCreateFormType,
  DialogListCreateVariantType,
  ListCreateVariantPropsType,
};
