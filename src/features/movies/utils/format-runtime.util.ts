import type { LocaleType } from "@/common/types/locale.type";

const formatRuntime = (runtime: number, locale: LocaleType) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime - hours * 60;

  if (minutes === 0) {
    return `${hours}${locale === "en" ? "hr" : "sa"}`;
  }

  return `${hours}${locale === "en" ? "hr" : "sa"} ${minutes}${locale === "en" ? "min" : "dk"}`;
};

export { formatRuntime };
