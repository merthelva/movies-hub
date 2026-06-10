type ListCreateBodyType = {
  name: string;
};

type ListCreateResponseType = {
  id: number;
  name: string;
  createdAt: string;
};

export type { ListCreateBodyType, ListCreateResponseType };
