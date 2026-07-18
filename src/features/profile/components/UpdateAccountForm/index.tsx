"use client";

import { useActionState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useImmer } from "use-immer";
import { toast } from "sonner";

import type { UpdateAccountFormPropsType } from "./component.type";
import styles from "./styles.module.scss";

import type { ObjectKeysType } from "@/common/types/object-keys.type";
import { updateProfileFormAction } from "@/features/profile/actions/form.actions";
import { INITIAL_STATE } from "@/features/profile/constants/form-initial-state.constant";
import { initialReadOnlyFormFields } from "@/features/profile/constants/initial-read-only-form-fields.constant";
import { InputWithSwitch } from "@/features/profile/components/InputWithSwitch";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Message } from "@/components/ui/Message";
import { useAuth } from "@/features/auth/context";

const UpdateAccountForm = ({
  id: userId,
  email,
  name,
}: UpdateAccountFormPropsType) => {
  const tProfile = useTranslations("Profile");
  const tAuth = useTranslations("Auth");
  const tCommon = useTranslations("Common");
  const { refreshUser, logout } = useAuth();
  const [readOnlyFormFields, updateReadOnlyFormFields] = useImmer(
    initialReadOnlyFormFields,
  );

  const [state, formAction, isPending] = useActionState(
    updateProfileFormAction.bind(null, userId, readOnlyFormFields),
    INITIAL_STATE,
  );

  const handleSwitchFieldUpdateStatus = (
    id: ObjectKeysType<typeof readOnlyFormFields>,
    yesOrNo: string,
  ) => {
    updateReadOnlyFormFields((draft) => {
      draft[id] = yesOrNo === "no";
    });
  };

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }

    const updateUserDetails = async () => {
      // it means new password is validated against schema validation
      // checks successfully beside being read-write and user password
      // has been updated without error.
      if (!readOnlyFormFields.newPassword) {
        await logout();
        toast.success(state.message);
        return;
      }

      // if either "name" or "email" field is updated,
      // user info should be updated without logging the user out.
      // `refreshUser` updates `user` context value in the background,
      // which means fields like "name" and/or "email" updated in UI.
      await refreshUser();
      toast.success(state.message);
    };

    updateUserDetails();
  }, [state, readOnlyFormFields.newPassword]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{tProfile("updateTitle")}</h2>
      <form className={styles.form} action={formAction}>
        <InputWithSwitch
          aria-describedby="update-name-error"
          autoComplete="off"
          id="name"
          name="name"
          defaultValue={state.status === "error" ? state.formFields.name : name}
          readOnly={readOnlyFormFields.name}
          label={tAuth("name")}
          hasError={state.status === "error" && state.errorFields?.has("name")}
          shouldFieldUpdated={!readOnlyFormFields.name}
          onSwitch={(yesOrNo) => handleSwitchFieldUpdateStatus("name", yesOrNo)}
        />
        <InputWithSwitch
          aria-describedby="update-email-error"
          type="email"
          autoComplete="off"
          id="email"
          name="email"
          defaultValue={
            state.status === "error" ? state.formFields.email : email
          }
          readOnly={readOnlyFormFields.email}
          label={tAuth("email")}
          hasError={state.status === "error" && state.errorFields?.has("email")}
          shouldFieldUpdated={!readOnlyFormFields.email}
          onSwitch={(yesOrNo) =>
            handleSwitchFieldUpdateStatus("email", yesOrNo)
          }
        />
        <Input
          aria-describedby="update-currentPassword-error"
          type="password"
          id="currentPassword"
          name="currentPassword"
          label={tProfile("currentPassword")}
          hasError={
            state.status === "error" &&
            state.errorFields?.has("currentPassword")
          }
          placeholder={tProfile("currentPasswordPlaceholder")}
        />
        <InputWithSwitch
          aria-describedby="update-newPassword-error"
          type="password"
          id="newPassword"
          name="newPassword"
          readOnly={readOnlyFormFields.newPassword}
          label={tProfile("newPassword")}
          hasError={
            state.status === "error" && state.errorFields?.has("newPassword")
          }
          placeholder={tProfile("newPasswordPlaceholder")}
          shouldFieldUpdated={!readOnlyFormFields.newPassword}
          onSwitch={(yesOrNo) =>
            handleSwitchFieldUpdateStatus("newPassword", yesOrNo)
          }
        />
        <Input
          aria-describedby="update-confirmPassword-error"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          readOnly={readOnlyFormFields.newPassword}
          label={tAuth("confirmPassword")}
          hasError={
            state.status === "error" &&
            state.errorFields?.has("confirmPassword")
          }
        />
        {state.status === "error" && state.message && (
          <Message
            id="update-profile-error"
            renderAs="p"
            variant="error"
            content={state.message}
          />
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          className={styles.submitBtn}
        >
          {isPending ? tCommon("saving") : tCommon("save")}
        </Button>
      </form>
    </section>
  );
};

export { UpdateAccountForm };
