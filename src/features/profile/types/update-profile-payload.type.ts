type UpdateProfilePayloadType = {
  name?: string;
  email?: string;
  currentPassword: string;
  newPassword?: string;
};

export type { UpdateProfilePayloadType };
