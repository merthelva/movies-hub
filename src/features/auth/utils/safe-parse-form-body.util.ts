import { type ZodType } from "zod";

const safeParseFormBody = <TFormBody>(
  schema: ZodType<TFormBody>,
  formBody: TFormBody,
) => {
  const parsed = schema.safeParse(formBody);

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues.map(({ message }) => message),
      path: new Set(parsed.error.issues.map(({ path }) => String(path[0]))),
    } as const;
  }

  return {
    status: "success",
    data: parsed.data,
  } as const;
};

export { safeParseFormBody };
