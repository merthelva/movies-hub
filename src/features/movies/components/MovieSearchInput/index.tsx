"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useDebounce } from "@/hooks/useDebounce.hook";
import { Input } from "@/components/ui/Input";
import styles from "./styles.module.scss";
import { useIsFirstRender } from "@/hooks/useIsFirstRender.hook";

const MovieSearchInput = () => {
  const t = useTranslations("Home");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsRef = useRef(searchParams);
  const [value, setValue] = useState(searchParams.get("query") ?? "");
  const debouncedValue = useDebounce(value, 500);
  const isFirstRender = useIsFirstRender();

  searchParamsRef.current = searchParams;

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    const query = new URLSearchParams(searchParamsRef.current.toString());
    if (debouncedValue) {
      query.set("query", debouncedValue);
    } else {
      query.delete("query");
    }
    router.replace(`${pathname}?${query.toString().toLowerCase()}`);
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Input
      type="search"
      aria-label={t("searchMovies")}
      placeholder={t("searchMovies")}
      className={styles.input}
      value={value}
      onChange={handleChange}
    />
  );
};

export { MovieSearchInput };
