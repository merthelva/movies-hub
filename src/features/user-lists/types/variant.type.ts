import type { DialogErrorVariantType } from "@/features/user-lists/components/ErrorVariant/component.type";
import type { DialogListCreateVariantType } from "@/features/user-lists/components/ListCreateVariant/component.type";
import type { DialogListSelectVariantType } from "@/features/user-lists/components/ListSelectVariant/component.type";

type DialogVariantType =
  | DialogErrorVariantType
  | DialogListSelectVariantType
  | DialogListCreateVariantType;

export type { DialogVariantType };
