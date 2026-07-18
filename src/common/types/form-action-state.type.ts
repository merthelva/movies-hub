type FormActionStateType<TFormFields = undefined> =
  | {
      status: "idle";
    }
  | {
      status: "success";
      message?: string;
    }
  | ({
      status: "error";
      message: string;
      errorFields?: Set<string>;
    } & (TFormFields extends Record<infer K, infer V>
      ? Record<"formFields", Record<K, V>>
      : Record<string, unknown>));

export type { FormActionStateType };
