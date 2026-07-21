"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";

import styles from "./styles.module.scss";

import { Button } from "@/components/ui/Button";

const SCROLL_THRESHOLD = 400;

const MoveToTopButton = () => {
  const t = useTranslations("Common");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(
      "scroll",
      () => {
        setIsVisible(window.scrollY > SCROLL_THRESHOLD);
      },
      { signal: controller.signal, passive: true },
    );

    return () => {
      controller.abort();
    };
  }, []);

  const handleMoveToTop = () => {
    window.scrollTo({ top: 0 });
  };

  if (!isVisible) return null;

  return (
    <Button
      aria-label={t("moveToTop")}
      className={styles.button}
      variant="secondary"
      onClick={handleMoveToTop}
    >
      <ArrowUp size={20} />
    </Button>
  );
};

export { MoveToTopButton };
