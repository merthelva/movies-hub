import { joinClassNames } from "@/common/utils/join-classnames.util";
import type { InputPropsType } from "./component.type";
import styles from "./styles.module.scss";

const Input = ({
  label,
  hasError = false,
  type = "text",
  ...props
}: InputPropsType) => {
  return (
    <div className={styles.field}>
      <label htmlFor={props.id} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        className={joinClassNames(
          styles.input,
          hasError ? styles.error : "",
          props.className,
        )}
        {...props}
      />
    </div>
  );
};

export { Input };
