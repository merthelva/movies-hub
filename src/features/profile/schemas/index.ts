import { z } from "zod";

import { serializeMessage } from "@/common/utils/serialize-message.util";
import type { TranslatorType } from "@/common/types/translator.type";

const createUpdateProfileSchema = (t: TranslatorType<"Profile">) =>
  z
    .object({
      name: z
        .string()
        .min(2, serializeMessage("error", t("nameMinLength")))
        .max(50, serializeMessage("error", t("nameMaxLength")))
        .optional(),
      email: z.email(serializeMessage("error", t("invalidEmail"))).optional(),
      currentPassword: z.string(),
      newPassword: z
        .union([
          z.literal(""),
          z
            .string()
            .min(6, serializeMessage("error", t("newPasswordMinLength"))),
        ])
        .optional(),
      confirmPassword: z
        .union([
          z.literal(""),
          z
            .string()
            .min(6, serializeMessage("error", t("confirmPasswordMinLength"))),
        ])
        .optional(),
    })
    .superRefine((values, ctx) => {
      if (values.currentPassword === "") {
        // can't prove identity to change the password without the current one
        ctx.addIssue({
          code: "custom",
          message: serializeMessage("error", t("currentPasswordRequired")),
          path: ["currentPassword"],
        });
      }

      const isChangingPassword = values.newPassword !== "";

      if (!isChangingPassword) {
        // blank newPassword means user isn't touching their password at all —
        // skip every rule below, a plain name/email update is valid as-is.
        return;
      }

      if (values.newPassword !== values.confirmPassword) {
        // newPassword's own min-length rule already runs at the field level
        // (see the union above) — this only guards the two fields matching
        ctx.addIssue({
          code: "custom",
          message: serializeMessage("error", t("passwordMismatch")),
          path: ["confirmPassword"],
        });
      }
    });

export { createUpdateProfileSchema };
