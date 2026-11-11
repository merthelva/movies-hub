import { getTranslations } from "next-intl/server";

const getUnexpectedErrorMessage = async () => {
  const t = await getTranslations("Errors");
  return t("unexpected");
};

export { getUnexpectedErrorMessage };
