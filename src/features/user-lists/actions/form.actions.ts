import { createList } from ".";
import { listCreateSchema } from "@/features/user-lists/schemas";
import { safeParseFormBody } from "@/features/auth/utils/safe-parse-form-body.util";
import { serializeMessage } from "@/common/utils/serialize-message.util";
import type { UserListType } from "@/features/user-lists/types/user-list.type";
import type { FormActionStateType } from "@/common/types/form-action-state.type";
import type { ListCreateBodyType } from "@/features/user-lists/types/actions.type";

const listCreateFormAction = async (
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

  const response = await createList(parsedListCreateForm.data, userListType);
  if (response.status === "error") {
    return {
      status: "error",
      formFields: {
        name: formData.get("list-name") as string,
      },
      message: serializeMessage("error", response.message),
    };
  }

  return { status: response.status };
};

export { listCreateFormAction };
