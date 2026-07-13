import type { FormActionStateType } from "@/common/types/form-action-state.type";
import type { ProfileUpdateBodyType } from "@/features/profile/types/actions.type";

const INITIAL_STATE: FormActionStateType<ProfileUpdateBodyType> = {
  status: "idle",
};

export { INITIAL_STATE };
