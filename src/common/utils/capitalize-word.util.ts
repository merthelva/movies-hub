import type { LanguageType } from "@/common/types/language.type";

const capitalizeWord = (word: string, lang: LanguageType) => {
  const [firstLetter, ...rest] = word.split("");
  return [firstLetter.toLocaleUpperCase(lang), ...rest].join("");
};

export { capitalizeWord };
