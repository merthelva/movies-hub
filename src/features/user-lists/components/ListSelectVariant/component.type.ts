import type { UserListsWithMovieStatusResponseType } from "@/features/user-lists/types/service-response.type";

type ListSelectVariantPropsType = {
  lists: UserListsWithMovieStatusResponseType;
  listIdToUpdate: number | null;
  onAdd: (listId: number) => void;
  onRemove: (listId: number) => void;
};

type DialogListSelectVariantType = ListSelectVariantPropsType & {
  variant: "list-select";
};

export type { DialogListSelectVariantType, ListSelectVariantPropsType };
