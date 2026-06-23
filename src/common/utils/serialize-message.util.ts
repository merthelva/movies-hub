import type { StateVariantType } from "@/common/types/state-variant.type";

const serializeMessage = (
  variant: StateVariantType,
  message: string | Array<string>,
): string => {
  let emoji: string | null = null;
  switch (variant) {
    case "info": {
      emoji = "ℹ️";
      break;
    }
    case "success": {
      emoji = "✅";
      break;
    }
    case "warning": {
      emoji = "⚠️";
      break;
    }
    case "error":
    default: {
      emoji = "❌";
      break;
    }
  }

  if (typeof message === "string") {
    return `${emoji} ${message}`;
  }
  return message.map((msg) => `${emoji} ${msg}`).join("\n");
};

export { serializeMessage };
