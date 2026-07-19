"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import type { DeleteMovieFromUserListButtonPropsType } from "./component.type";

import { Language } from "@/common/constants/language.constant";
import type { LocaleType } from "@/common/types/locale.type";
import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

const DeleteMovieFromUserListButton = ({
  listId,
  movieId,
  onDeleteMovieFromUserList,
}: DeleteMovieFromUserListButtonPropsType) => {
  const locale = useLocale() as LocaleType;
  const [isPending, startTransition] = useTransition();

  const handleDeleteMovieFromUserList = () => {
    startTransition(async () => {
      const response = await onDeleteMovieFromUserList(
        listId,
        movieId,
        Language[locale],
      );
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.data.message);
    });
  };

  return (
    <Button variant="ghost" onClick={handleDeleteMovieFromUserList}>
      {isPending ? <LoadingIndicator /> : <Trash size={18} />}
    </Button>
  );
};

export { DeleteMovieFromUserListButton };
