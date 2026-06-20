"use client";

import { useRef } from "react";
import type { KeyboardEvent } from "react";

import { joinClassNames } from "@/common/utils/join-classnames.util";
import { Button } from "@/components/ui/Button";

import type { MultiSwitchPropsType } from "./component.type";
import styles from "./styles.module.scss";

const MultiSwitch = ({
  options,
  value,
  onChange,
  className,
  ...rest
}: MultiSwitchPropsType) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const currentIndex = options.findIndex((opt) => opt.value === value);
    let nextIndex = currentIndex;

    if (new Set(["ArrowRight", "ArrowDown"]).has(e.key)) {
      nextIndex = (currentIndex + 1) % options.length;
    } else if (new Set(["ArrowLeft", "ArrowUp"]).has(e.key)) {
      nextIndex = (currentIndex - 1 + options.length) % options.length;
    } else {
      return;
    }

    onChange(options[nextIndex].value);
    const buttons =
      wrapperRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    buttons?.[nextIndex]?.focus();
  };

  return (
    <div
      ref={wrapperRef}
      role="radiogroup"
      className={joinClassNames(styles.wrapper, className)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant="ghost"
          role="radio"
          aria-checked={value === opt.value}
          aria-label={`Switch to ${opt.label}`}
          tabIndex={value === opt.value ? 0 : -1}
          className={joinClassNames(
            styles.option,
            value === opt.value ? styles.active : "",
          )}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
};

export { MultiSwitch };
