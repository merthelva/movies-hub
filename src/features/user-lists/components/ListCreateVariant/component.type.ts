type DialogListCreateFormType = {
  name: string;
};

type ListCreateVariantPropsType = {
  onCreate: (data: DialogListCreateFormType) => Promise<void>;
  onClose: VoidFunction;
};

type DialogListCreateVariantType = ListCreateVariantPropsType & {
  variant: "list-create";
  movieId: number;
};

export type {
  DialogListCreateFormType,
  DialogListCreateVariantType,
  ListCreateVariantPropsType,
};
