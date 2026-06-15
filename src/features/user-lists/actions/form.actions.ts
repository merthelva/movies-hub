"use server";

import { listCreateSchema } from "@/features/user-lists/schemas";
import { safeParseFormBody } from "@/features/auth/utils/safe-parse-form-body.util";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import type { UserListType } from "@/features/user-lists/types/user-list.type";
import type { FormActionStateType } from "@/common/types/form-action-state.type";
import type { ListCreateBodyType } from "@/features/user-lists/types/actions.type";
import {
  addMovieToUserFavoritelist,
  addMovieToUserWatchlist,
  createUserFavoritelist,
  createUserWatchlist,
  updateUserFavoritelist,
  updateUserWatchlist,
} from "@/features/user-lists/services";

const listCreateFormAction = async (
  movieId: number,
  userListType: UserListType,
  _prevState: FormActionStateType<ListCreateBodyType>,
  formData: FormData,
): Promise<FormActionStateType<ListCreateBodyType>> => {
  const parsedListCreateForm = safeParseFormBody(listCreateSchema, {
    name: formData.get("list-name") as string,
  });

  if (parsedListCreateForm.status === "error") {
    return {
      ...parsedListCreateForm,
      formFields: {
        name: formData.get("list-name") as string,
      },
    };
  }

  const createUserListFn =
    userListType === "favoritelists"
      ? createUserFavoritelist
      : createUserWatchlist;

  const addMovieToUserListFn =
    userListType === "favoritelists"
      ? addMovieToUserFavoritelist
      : addMovieToUserWatchlist;

  const response = await createUserListFn(parsedListCreateForm.data.name);
  if (response.status === "error") {
    return {
      status: "error",
      formFields: {
        name: formData.get("list-name") as string,
      },
      message: serializeMessage("error", response.message),
    };
  }

  const movieAddToListResponse = await addMovieToUserListFn(
    response.data.id,
    movieId,
  );

  if (movieAddToListResponse.status === "error") {
    return {
      status: "error",
      formFields: {
        name: formData.get("list-name") as string,
      },
      message: serializeMessage("error", movieAddToListResponse.message),
    };
  }

  return { status: "success" };
};

const listEditFormAction = async (
  listId: number,
  userListType: UserListType,
  _prevState: FormActionStateType<ListCreateBodyType>,
  formData: FormData,
): Promise<FormActionStateType<ListCreateBodyType>> => {
  const parsedListEditForm = safeParseFormBody(listCreateSchema, {
    name: formData.get("list-name") as string,
  });

  if (parsedListEditForm.status === "error") {
    return {
      ...parsedListEditForm,
      formFields: {
        name: formData.get("list-name") as string,
      },
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
        name: formData.get("list-name") as string,
      },
      message: serializeMessage("error", response.message),
    };
  }

  return { status: "success" };
};

export { listCreateFormAction, listEditFormAction };
