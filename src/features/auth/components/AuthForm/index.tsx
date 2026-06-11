"use client";

import { useActionState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import styles from "./styles.module.scss";
import {
  loginFormAction,
  registerFormAction,
} from "@/features/auth/actions/form.actions";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import type { AuthFormPropsType } from "@/features/auth/types/component.type";
import { Input } from "@/components/ui/Input";
import { Message } from "@/components/ui/Message";
import {
  LOGIN_INITIAL_STATE,
  REGISTER_INITIAL_STATE,
} from "@/features/auth/constants/form-initial-state.constant";
import { NavLink } from "@/components/NavLink";

const AuthForm = ({ mode, redirectTo }: AuthFormPropsType) => {
  const t = useTranslations("Auth");
  const { locale } = useParams<{ locale: string }>();
  const isLogin = mode === "login";

  const [state, formAction, isPending] = useActionState(
    isLogin ? loginFormAction : registerFormAction,
    isLogin ? LOGIN_INITIAL_STATE : REGISTER_INITIAL_STATE,
  );

  // router.push triggers soft navigation — AuthProvider doesn't remount, user state stays null.
  // window.location.assign forces full browser navigation → remount → getCurrentUser() re-runs.
  useEffect(() => {
    if (state.status !== "success") {
      return;
    }
    window.location.assign(redirectTo ?? `/${locale}`);
  }, [state.status, redirectTo, locale]);

  return (
    <form className={styles.form} action={formAction} noValidate>
      <h1 className={styles.title}>{isLogin ? t("login") : t("register")}</h1>

      {!isLogin && (
        <Input
          aria-describedby="auth-form-error"
          id="name"
          name="name"
          label={t("name")}
          defaultValue={
            state.status === "error" && "name" in state.formFields
              ? String(state.formFields.name)
              : ""
          }
          hasError={state.status === "error"}
          placeholder="Enter [2-50] characters"
        />
      )}
      <Input
        aria-describedby="auth-form-error"
        type="email"
        id="email"
        name="email"
        label={t("email")}
        defaultValue={state.status === "error" ? state.formFields.email : ""}
        hasError={state.status === "error"}
        placeholder="test@placeholder.com"
      />
      <Input
        aria-describedby="auth-form-error"
        type="password"
        id="password"
        name="password"
        label={t("password")}
        defaultValue={state.status === "error" ? state.formFields.password : ""}
        hasError={state.status === "error"}
        placeholder="Enter at least 6 characters"
      />
      {state.status === "error" && state.message && (
        <Message
          id="auth-form-error"
          renderAs="p"
          variant="error"
          content={state.message}
        />
      )}

      <Button type="submit" disabled={isPending} className={styles.submitBtn}>
        {isPending ? t("loading") : t(isLogin ? "signIn" : "signUp")}
      </Button>

      <p className={styles.switchMode}>
        {isLogin ? t("noAccount") : t("haveAccount")}{" "}
        <NavLink
          className={styles.switchLink}
          href={isLogin ? "/auth/register" : "/auth/login"}
          label={isLogin ? t("register") : t("login")}
        />
      </p>
    </form>
  );
};

export { AuthForm };
