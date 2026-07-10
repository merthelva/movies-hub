"use client";

import { useActionState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import type { ListCreateVariantPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Message } from "@/components/ui/Message";
import { listCreateFormAction } from "@/features/user-lists/actions/form.actions";
import { INITIAL_STATE } from "@/features/user-lists/constants/form-initial-state.constant";

const ListCreateVariant = ({
  userListType,
  onClose,
  ...rest
}: ListCreateVariantPropsType) => {
  const tLists = useTranslations("Lists");
  const tCommon = useTranslations("Common");
  const [state, formAction, isPending] = useActionState(
    listCreateFormAction.bind(
      null,
      rest.option === "with-movie-addition" ? rest.movieId : null,
      userListType,
    ),
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.status === "idle") {
      return;
    }

    if (state.status === "success") {
      onClose();
      toast.success(state.message);
      return;
    }
  }, [state]);

  return (
    <form className={styles.listCreateVariant} action={formAction}>
      <Input
        aria-describedby="list-name-error"
        id="list-name"
        name="list-name"
        label={tLists("listName")}
        defaultValue={state.status === "error" ? state.formFields.name : ""}
        hasError={state.status === "error"}
        placeholder={tLists("listNamePlaceholder")}
      />
      {state.status === "error" && state.message && (
        <Message id="list-name-error" variant="error" content={state.message} />
      )}
      <div className={styles.formActions}>
        <Button
          type="button"
          variant="ghost"
          componentSize="md"
          onClick={onClose}
        >
          {tCommon("cancel")}
        </Button>
        <Button
          type="submit"
          variant="primary"
          componentSize="md"
          disabled={isPending}
        >
          {isPending ? tLists("creating") : tCommon("create")}
        </Button>
      </div>
    </form>
  );
};

export { ListCreateVariant };
