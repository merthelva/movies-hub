import type { SENSITIVE_FORM_FIELDS } from "@/common/constants/sensitive-form-fields.constant";
import type { ArrayIndexToLiteralType } from "@/common/types/array-index-to-literal.type";

type SensitiveFormFieldType = ArrayIndexToLiteralType<
  typeof SENSITIVE_FORM_FIELDS
>;

type WithoutSensitiveFormFieldsType<TFormFields> = Omit<
  TFormFields,
  SensitiveFormFieldType
>;

export type { SensitiveFormFieldType, WithoutSensitiveFormFieldsType };
