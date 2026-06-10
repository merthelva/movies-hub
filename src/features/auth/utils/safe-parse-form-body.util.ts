const safeParseFormBody = <TSchema, TFormBody>(
  schema: TSchema,
  formBody: TFormBody,
) => {
  const parsed = (schema as any).safeParse(formBody); // TODO: Get rid of `any` type

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0].message,
    } as const;
  }

  return {
    status: "success",
    data: parsed.data as TFormBody,
  } as const;
};

export { safeParseFormBody };
