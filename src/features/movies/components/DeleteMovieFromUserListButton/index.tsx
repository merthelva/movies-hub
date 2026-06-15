"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/Button";
import type { DeleteMovieFromUserListButtonPropsType } from "./component.type";
import { useTransition } from "react";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

const DeleteMovieFromUserListButton = ({
  listId,
  movieId,
  onDeleteMovieFromUserList,
}: DeleteMovieFromUserListButtonPropsType) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteMovieFromUserList = () => {
    startTransition(async () => {
      onDeleteMovieFromUserList(listId, movieId);
    });
  };

  return (
    <Button variant="ghost" onClick={handleDeleteMovieFromUserList}>
      {isPending ? <LoadingIndicator /> : <Trash size={18} />}
    </Button>
  );
};

export { DeleteMovieFromUserListButton };
