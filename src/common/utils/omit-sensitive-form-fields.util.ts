import { SENSITIVE_FORM_FIELDS } from "@/common/constants/sensitive-form-fields.constant";
import type { WithoutSensitiveFormFieldsType } from "@/common/types/sensitive-form-field.type";

// Form fields echoed back to the client after a failed submission must never
// carry secrets, otherwise they travel in the action response and sit in client state.
const omitSensitiveFormFields = <TFormFields extends Record<string, string>>(
  formFields: TFormFields,
): WithoutSensitiveFormFieldsType<TFormFields> => {
  const sensitiveFields: ReadonlyArray<string> = SENSITIVE_FORM_FIELDS;

  return Object.fromEntries(
    Object.entries(formFields).filter(
      ([field]) => !sensitiveFields.includes(field),
    ),
  ) as WithoutSensitiveFormFieldsType<TFormFields>;
};

export { omitSensitiveFormFields };
