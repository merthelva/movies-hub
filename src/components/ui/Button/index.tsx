import type { ButtonPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { joinClassNames } from "@/common/utils/join-classnames.util";

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
    type="button"
    {...rest}
  >
    {children}
  </button>
);

export { Button };
