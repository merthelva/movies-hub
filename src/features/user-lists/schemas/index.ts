import { z } from "zod";

import { serializeMessage } from "@/common/utils/serialize-message.util";
import type { TranslatorType } from "@/common/types/translator.type";

const createListCreateSchema = (t: TranslatorType<"Lists">) =>
  z.object({
    name: z
      .string()
      .min(1, serializeMessage("error", t("nameRequired")))
      .max(50, serializeMessage("error", t("nameMaxLength")))
      .regex(
        /^[A-Za-z0-9#\.\s_-]+$/,
        serializeMessage("error", t("nameInvalidChars")),
      ),
  });

export { createListCreateSchema };
