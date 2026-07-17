import { z } from "zod";

import { serializeMessage } from "@/common/utils/serialize-message.util";
import type { TranslatorType } from "@/common/types/translator.type";

const createLoginSchema = (t: TranslatorType<"Auth">) =>
  z.object({
    email: z.email(serializeMessage("error", t("invalidEmail"))),
    password: z
      .string()
      .min(6, serializeMessage("error", t("passwordMinLength"))),
  });

const createRegisterSchema = (t: TranslatorType<"Auth">) =>
  createLoginSchema(t)
    .extend({
      name: z
        .string()
        .min(2, serializeMessage("error", t("nameMinLength")))
        .max(50, serializeMessage("error", t("nameMaxLength"))),
      confirmPassword: z
        .string()
        .min(6, serializeMessage("error", t("confirmPasswordMinLength"))),
    })
    .superRefine((values, ctx) => {
      if (values.password !== values.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: serializeMessage("error", t("passwordMismatch")),
          path: ["confirmPassword"],
        });
      }
    });

export { createLoginSchema, createRegisterSchema };
