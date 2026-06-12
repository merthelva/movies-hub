import { joinClassNames } from "@/common/utils/join-classnames.util";
import type { ButtonPropsType } from "./component.type";
import styles from "./styles.module.scss";

const Button = ({
  children,
  variant = "primary",
  componentSize = "md",
  className,
  ...rest
}: ButtonPropsType) => (
  <button
    className={joinClassNames(
      styles.button,
      styles[componentSize],
      styles[variant],
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);

export { Button };
