import type { FormActionStateType } from "@/common/types/form-action-state.type";
import type { ListCreateBodyType } from "@/features/user-lists/types/actions.type";

const INITIAL_STATE: FormActionStateType<ListCreateBodyType> = {
  status: "idle",
};

export { INITIAL_STATE };
