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
import { INITIAL_STATE } from "@/common/constants/form-initial-state.constant";

const AuthForm = ({ mode, redirectTo }: AuthFormPropsType) => {
  const t = useTranslations("Auth");
  const { locale } = useParams<{ locale: string }>();
  const isLogin = mode === "login";

  const [state, formAction, isPending] = useActionState(
    isLogin ? loginFormAction : registerFormAction,
    INITIAL_STATE,
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
        />
      )}
      <Input
        aria-describedby="auth-form-error"
        type="email"
        id="email"
        name="email"
        label={t("email")}
      />
      <Input
        aria-describedby="auth-form-error"
        type="password"
        id="password"
        name="password"
        label={t("password")}
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
        <Link
          href={isLogin ? "/auth/register" : "/auth/login"}
          className={styles.switchLink}
        >
          {isLogin ? t("register") : t("login")}
        </Link>
      </p>
    </form>
  );
};

export { AuthForm };
