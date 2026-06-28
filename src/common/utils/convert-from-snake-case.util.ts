import { capitalizeWord } from "./capitalize-word.util";

import type { LanguageType } from "@/common/types/language.type";

const convertFromSnakeCase = (str: string, lang: LanguageType) => {
  const tokens = str.split("_");
  const capitalizedTokens = tokens.map((token) => capitalizeWord(token, lang));
  return capitalizedTokens.join(" ");
};

export { convertFromSnakeCase };
