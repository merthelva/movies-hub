import { z } from "zod";

import { serializeMessage } from "@/common/utils/serialize-message.util";
import type { TranslatorType } from "@/common/types/translator.type";
import type { initialReadOnlyFormFields } from "@/features/profile/constants/initial-read-only-form-fields.constant";

const createUpdateProfileSchema = (
  t: TranslatorType<"Profile">,
  readOnlyFormFields: typeof initialReadOnlyFormFields,
) =>
  z
    .object({
      name: readOnlyFormFields.name
        ? z.string().optional()
        : z
            .string()
            .min(2, serializeMessage("error", t("nameMinLength")))
            .max(50, serializeMessage("error", t("nameMaxLength")))
            .optional(),
      email: readOnlyFormFields.email
        ? z.string().optional()
        : z.email(serializeMessage("error", t("invalidEmail"))).optional(),
      currentPassword: z.string(),
      newPassword: readOnlyFormFields.newPassword
        ? z.string().optional()
        : z
            .string()
            .min(6, serializeMessage("error", t("newPasswordMinLength")))
            .optional(),
      confirmPassword: readOnlyFormFields.newPassword
        ? z.string().optional()
        : z
            .string()
            .min(6, serializeMessage("error", t("confirmPasswordMinLength")))
            .optional(),
    })
    .superRefine((values, ctx) => {
      if (values.currentPassword === "") {
        // can't prove identity to update profile without current password
        ctx.addIssue({
          code: "custom",
          message: serializeMessage("error", t("currentPasswordRequired")),
          path: ["currentPassword"],
        });
      }

      if (
        !readOnlyFormFields.newPassword &&
        values.newPassword != null &&
        values.confirmPassword != null
      ) {
        if (values.newPassword.length !== values.confirmPassword.length) {
          ctx.addIssue({
            code: "custom",
            message: serializeMessage("error", t("passwordMismatch")),
            path: ["confirmPassword"],
          });
        }
      }
    });

export { createUpdateProfileSchema };
