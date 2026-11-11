import type { routing } from "@/i18n/routing";

import type { ArrayIndexToLiteralType } from "./array-index-to-literal.type";

type LocaleType = ArrayIndexToLiteralType<typeof routing.locales>;

export type { LocaleType };
