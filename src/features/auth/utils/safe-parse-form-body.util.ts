import { type ZodType } from "zod";

const safeParseFormBody = <TFormBody>(
  schema: ZodType<TFormBody>,
  formBody: TFormBody,
) => {
  const parsed = schema.safeParse(formBody);

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0].message,
    } as const;
  }

  return {
    status: "success",
    data: parsed.data,
  } as const;
};

export { safeParseFormBody };
