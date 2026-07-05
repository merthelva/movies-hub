"use client";

import { useTransition } from "react";
import { Trash } from "lucide-react";
import { useLocale } from "next-intl";

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
    startTransition(() => {
      onDeleteUserList(listId, Language[locale]);
    });
  };

  return (
    <Button variant="ghost" disabled={isPending} onClick={handleDeleteUserList}>
      {isPending ? <LoadingIndicator /> : <Trash size={20} />}
    </Button>
  );
};

export { DeleteUserListButton };
