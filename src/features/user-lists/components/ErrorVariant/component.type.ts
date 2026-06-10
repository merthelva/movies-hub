type ErrorVariantPropsType = {
  message: string;
  onClose: VoidFunction;
};

type DialogErrorVariantType = ErrorVariantPropsType & {
  variant: "error";
};

export type { DialogErrorVariantType, ErrorVariantPropsType };
