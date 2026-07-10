"use client";

import { useTransition } from "react";
import { Trash } from "lucide-react";
import { useLocale } from "next-intl";
import { toast } from "sonner";

import type { DeleteUserListButtonPropsType } from "./component.type";

import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { Language } from "@/common/constants/language.constant";
import type { LocaleType } from "@/common/types/locale.type";

const DeleteUserListButton = ({
  listId,
  onDeleteUserList,
}: DeleteUserListButtonPropsType) => {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale() as LocaleType;

  const handleDeleteUserList = () => {
    startTransition(async () => {
      const response = await onDeleteUserList(listId, Language[locale]);
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.data.message);
    });
  };

  return (
    <Button variant="ghost" disabled={isPending} onClick={handleDeleteUserList}>
      {isPending ? <LoadingIndicator /> : <Trash size={20} />}
    </Button>
  );
};

export { DeleteUserListButton };
