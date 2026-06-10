import type { FormActionStateType } from "@/common/types/form-action-state.type";
import type {
  LoginCredentialsType,
  RegisterCredentialsType,
} from "@/features/auth/types/actions.type";

const REGISTER_INITIAL_STATE: FormActionStateType<RegisterCredentialsType> = {
  status: "idle",
};

const LOGIN_INITIAL_STATE: FormActionStateType<LoginCredentialsType> = {
  status: "idle",
};

export { REGISTER_INITIAL_STATE, LOGIN_INITIAL_STATE };
