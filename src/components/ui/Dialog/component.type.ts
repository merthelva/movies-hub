import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type DialogListItemType = {
  id: number;
  name: string;
};

type DialogListCreateFormType = {
  name: string;
};

type DialogErrorVariantType = ErrorVariantPropsType & {
  variant: "error";
};

type DialogListSelectVariantType = ListSelectVariantPropsType & {
  variant: "list-select";
  lists: Array<DialogListItemType>;
  movieId: number;
};

type DialogListCreateVariantType = ListCreateVariantPropsType & {
  variant: "list-create";
  movieId: number;
};

type DialogVariantType =
  | DialogErrorVariantType
  | DialogListSelectVariantType
  | DialogListCreateVariantType;

type DialogPropsType = ComponentPropsWithoutRef<"dialog"> &
  PropsWithChildren & {
    isOpen: boolean;
    onClose: VoidFunction;
    title?: string;
  } & DialogVariantType;

// ==============================================
// Dialog Variant Sub Component Props Types
// ==============================================
type ErrorVariantPropsType = {
  message: string;
  onClose: VoidFunction;
};

type ListSelectVariantPropsType = {
  lists: Array<{ id: number; name: string }>;
  movieListIds: Array<number>;
  // TODO: These prop handlers might be optional depending on the movie status in a list.
  onAdd: (listId: number) => void;
  onRemove: (listId: number) => void;
};

type ListCreateVariantPropsType = {
  onCreate: (data: DialogListCreateFormType) => Promise<void>;
  onClose: VoidFunction;
};

export type {
  DialogListItemType,
  DialogListCreateFormType,
  DialogErrorVariantType,
  DialogListSelectVariantType,
  DialogListCreateVariantType,
  DialogVariantType,
  DialogPropsType,
  ErrorVariantPropsType,
  ListSelectVariantPropsType,
  ListCreateVariantPropsType,
};
