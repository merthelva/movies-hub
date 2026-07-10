"use client";

import { useTransition } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import type { DeleteMovieFromUserListButtonPropsType } from "./component.type";

import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

const DeleteMovieFromUserListButton = ({
  listId,
  movieId,
  onDeleteMovieFromUserList,
}: DeleteMovieFromUserListButtonPropsType) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteMovieFromUserList = () => {
    startTransition(async () => {
      const response = await onDeleteMovieFromUserList(listId, movieId);
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
