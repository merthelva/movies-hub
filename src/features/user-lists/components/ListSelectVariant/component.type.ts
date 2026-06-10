type ListSelectVariantPropsType = {
  lists: Array<{ id: number; name: string }>;
  movieListIds: Array<number>;
  // TODO: These prop handlers might be optional depending on the movie status in a list.
  onAdd: (listId: number) => void;
  onRemove: (listId: number) => void;
};

type DialogListItemType = {
  id: number;
  name: string;
};

type DialogListSelectVariantType = ListSelectVariantPropsType & {
  variant: "list-select";
  lists: Array<DialogListItemType>;
  movieId: number;
};

export type { DialogListSelectVariantType, ListSelectVariantPropsType };
