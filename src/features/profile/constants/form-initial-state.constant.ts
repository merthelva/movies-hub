import type { FormActionStateType } from "@/common/types/form-action-state.type";
import type { WithoutSensitiveFormFieldsType } from "@/common/types/sensitive-form-field.type";
import type { ProfileUpdateBodyType } from "@/features/profile/types/actions.type";

const INITIAL_STATE: FormActionStateType<
  WithoutSensitiveFormFieldsType<ProfileUpdateBodyType>
> = {
  status: "idle",
};

export { INITIAL_STATE };
