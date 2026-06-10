import { joinClassNames } from "@/common/utils/join-classnames.util";
import type { InputPropsType } from "./component.type";
import styles from "./styles.module.scss";

const Input = ({ label, type = "text", ...props }: InputPropsType) => {
  return (
    <div className={styles.field}>
      <label htmlFor={props.id} className={styles.label}>
        {label}
      </label>
      <input
        {...props}
        className={joinClassNames(styles.input, props.className)}
        type={type}
        id={props.id}
        name={props.id}
      />
    </div>
  );
};

export { Input };
