import { z } from "zod";

import { serializeMessage } from "@/common/utils/serialize-message.util";

const updateProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, serializeMessage("error", "Name must be at least 2 characters"))
      .max(50, serializeMessage("error", "Name must be at most 50 characters"))
      .optional(),
    email: z
      .email(serializeMessage("error", "Invalid email address"))
      .optional(),
    currentPassword: z.string(),
    newPassword: z
      .union([
        z.literal(""),
        z
          .string()
          .min(
            6,
            serializeMessage(
              "error",
              "New password should be at least 6 characters long",
            ),
          ),
      ])
      .optional(),
    confirmPassword: z
      .union([
        z.literal(""),
        z
          .string()
          .min(
            6,
            serializeMessage(
              "error",
              "Confirm password should be at least 6 characters long",
            ),
          ),
      ])
      .optional(),
  })
  .superRefine((values, ctx) => {
    if (values.currentPassword === "") {
      // can't prove identity to change the password without the current one
      ctx.addIssue({
        code: "custom",
        message: serializeMessage(
          "error",
          "Current password is required to set a new password",
        ),
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
        message: serializeMessage("error", "Passwords do not match"),
        path: ["confirmPassword"],
      });
    }
  });

export { updateProfileSchema };
