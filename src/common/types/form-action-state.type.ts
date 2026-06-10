type FormActionStateType<TFormFields = undefined> =
  | {
      status: "idle" | "success";
    }
  | ({
      status: "error";
      message: string;
    } & (TFormFields extends Record<infer K, infer V>
      ? Record<"formFields", Record<K, V>>
      : {}));

export type { FormActionStateType };
