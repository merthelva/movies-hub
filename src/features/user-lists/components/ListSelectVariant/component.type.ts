import type { ListCreateResponseType } from "@/features/user-lists/types/actions.type";

type ListSelectVariantPropsType = {
  lists: Array<{ id: number; name: string }>;
  movieListIds: Array<number>;
  // TODO: These prop handlers might be optional depending on the movie status in a list.
  onAdd: (listId: number) => void;
  onRemove: (listId: number) => void;
};

type DialogListSelectVariantType = ListSelectVariantPropsType & {
  variant: "list-select";
  lists: Array<ListCreateResponseType>;
  movieId: number;
};

export type { DialogListSelectVariantType, ListSelectVariantPropsType };
