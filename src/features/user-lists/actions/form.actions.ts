"use server";

import { getTranslations } from "next-intl/server";

import { createListCreateSchema } from "@/features/user-lists/schemas";
import { safeParseFormBody } from "@/features/auth/utils/safe-parse-form-body.util";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import type { UserListType } from "@/features/user-lists/types/user-list.type";
import type { FormActionStateType } from "@/common/types/form-action-state.type";
import type { ListCreateBodyType } from "@/features/user-lists/types/actions.type";
import {
  createUserFavoritelist,
  createUserWatchlist,
  updateUserFavoritelist,
  updateUserWatchlist,
} from "@/features/user-lists/services";

const listCreateFormAction = async (
  movieId: number | null,
  userListType: UserListType,
  _prevState: FormActionStateType<ListCreateBodyType>,
  formData: FormData,
): Promise<FormActionStateType<ListCreateBodyType>> => {
  const t = await getTranslations("Lists");
  const listCreateSchema = createListCreateSchema(t);

  const parsedListCreateForm = safeParseFormBody(listCreateSchema, {
    name: String(formData.get("list-name") ?? ""),
  });

  if (parsedListCreateForm.status === "error") {
    return {
      ...parsedListCreateForm,
      formFields: {
        name: String(formData.get("list-name") ?? ""),
      },
      errorFields: parsedListCreateForm.path,
      message: parsedListCreateForm.message.join("\n"),
    };
  }

  const createUserListFn =
    userListType === "favoritelists"
      ? createUserFavoritelist
      : createUserWatchlist;

  const response = await createUserListFn(parsedListCreateForm.data.name);
  if (response.status === "error") {
    return {
      status: "error",
      formFields: {
        name: String(formData.get("list-name") ?? ""),
      },
      message: serializeMessage("error", response.message),
    };
  }

  if (movieId === null) {
    return { status: "success", message: t("listCreated") };
  }

  const { addMovieToUserFavoritelist, addMovieToUserWatchlist } =
    await import("@/features/user-lists/services");
  const addMovieToUserListFn =
    userListType === "favoritelists"
      ? addMovieToUserFavoritelist
      : addMovieToUserWatchlist;

  const movieAddToListResponse = await addMovieToUserListFn(
    response.data.id,
    movieId,
  );

  if (movieAddToListResponse.status === "error") {
    return {
      status: "error",
      formFields: {
        name: String(formData.get("list-name") ?? ""),
      },
      message: serializeMessage("error", movieAddToListResponse.message),
    };
  }

  return { status: "success", message: movieAddToListResponse.data.message };
};

const listEditFormAction = async (
  listId: number,
  userListType: UserListType,
  _prevState: FormActionStateType<ListCreateBodyType>,
  formData: FormData,
): Promise<FormActionStateType<ListCreateBodyType>> => {
  const t = await getTranslations("Lists");
  const listCreateSchema = createListCreateSchema(t);

  const parsedListEditForm = safeParseFormBody(listCreateSchema, {
    name: String(formData.get("list-name") ?? ""),
  });

  if (parsedListEditForm.status === "error") {
    return {
      ...parsedListEditForm,
      formFields: {
        name: String(formData.get("list-name") ?? ""),
      },
      errorFields: parsedListEditForm.path,
      message: parsedListEditForm.message.join("\n"),
    };
  }

  const updateUserListFn =
    userListType === "favoritelists"
      ? updateUserFavoritelist
      : updateUserWatchlist;

  const response = await updateUserListFn(listId, parsedListEditForm.data.name);
  if (response.status === "error") {
    return {
      status: "error",
      formFields: {
        name: String(formData.get("list-name") ?? ""),
      },
      message: serializeMessage("error", response.message),
    };
  }

  return { status: "success", message: response.data.message };
};

export { listCreateFormAction, listEditFormAction };
