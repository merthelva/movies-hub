import type { InputPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { joinClassNames } from "@/common/utils/join-classnames.util";

const Input = ({
  componentSize = "md",
  label,
  hasError = false,
  type = "text",
  className,
  ...props
}: InputPropsType) => {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={joinClassNames(
          styles.input,
          styles[componentSize],
          hasError ? styles.error : "",
          className,
        )}
        {...props}
      />
    </div>
  );
};

export { Input };
