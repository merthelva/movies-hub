"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { AlertPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { serializeMessage } from "@/common/utils/serialize-message.util";
import { Message } from "@/components/ui/Message";
import { joinClassNames } from "@/common/utils/join-classnames.util";
import { Button } from "@/components/ui/Button";

// Note: If `hasAutoDismiss` prop is passed, make sure to pass a stable `key` prop value to the component as well.
// Otherwise, once the component is dismissed, it will not be visible again, since the component is NOT unmounted
// and hence `useEffect` is not re-triggered.
// Example:
// ```
//   <Alert
//     key={String(query)}
//     content="No movie is found with this search input."
//     variant="info"
//     hasAutoDismiss
//     isDismissible
//   />
// ```

const Alert = ({
  content,
  variant,
  role = "status",
  isDismissible = false,
  hasAutoDismiss = false,
}: AlertPropsType) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (!hasAutoDismiss) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [hasAutoDismiss]);

  return (
    isVisible && (
      <div
        className={joinClassNames(styles.alert, styles[variant])}
        role={role}
      >
        {typeof content === "string" ? (
          <Message
            variant={variant}
            content={serializeMessage(variant, content)}
          />
        ) : (
          <>{content}</>
        )}
        {isDismissible && isVisible && (
          <Button type="button" variant="ghost" onClick={handleDismiss}>
            <X size={16} />
          </Button>
        )}
      </div>
    )
  );
};

export { Alert };
