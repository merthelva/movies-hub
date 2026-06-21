"use client";

import { useRef, type KeyboardEvent } from "react";

import { joinClassNames } from "@/common/utils/join-classnames.util";

import type { TabListPropsType } from "./component.type";
import styles from "./styles.module.scss";
import { Button } from "../Button";

const TabList = ({
  tabs,
  activeTabId,
  onChange,
  className,
  ...rest
}: TabListPropsType) => {
  const tablistRef = useRef<HTMLDivElement>(null);
  const isScrollable = tabs.length > 4;

  const getTabId = (id: string) => `tab-${id}`;
  const getPanelId = (id: string) => `panel-${id}`;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!new Set(["ArrowRight", "ArrowLeft"]).has(e.key)) {
      return;
    }

    e.preventDefault();

    const activeIndex = tabs.findIndex((t) => t.id === activeTabId);
    const direction = e.key === "ArrowRight" ? 1 : -1;
    const { length } = tabs;

    for (let i = 1; i < length; i++) {
      const index = (activeIndex + direction * i + length) % length;

      if (!tabs[index].disabled) {
        onChange(tabs[index].id);
        const buttons =
          tablistRef.current?.querySelectorAll<HTMLButtonElement>(
            '[role="tab"]',
          );
        buttons?.[index]?.focus();
        break;
      }
    }
  };

  return (
    <div className={joinClassNames(styles.wrapper, className)} {...rest}>
      <div
        ref={tablistRef}
        role="tablist"
        aria-label={rest["aria-label"]}
        className={joinClassNames(
          styles.tablist,
          isScrollable ? styles.scrollable : "",
        )}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            id={getTabId(tab.id)}
            role="tab"
            aria-selected={tab.id === activeTabId}
            aria-controls={getPanelId(tab.id)}
            disabled={tab.disabled}
            tabIndex={tab.id === activeTabId ? 0 : -1}
            className={joinClassNames(
              styles.tab,
              tab.id === activeTabId ? styles.active : "",
            )}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={getPanelId(tab.id)}
          role="tabpanel"
          aria-labelledby={getTabId(tab.id)}
          tabIndex={0}
          className={styles.panel}
          hidden={tab.id !== activeTabId}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export { TabList };
