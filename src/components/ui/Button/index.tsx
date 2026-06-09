import { joinClassNames } from "@/common/utils/join-classnames.util";
import type { ButtonPropsType } from "./component.type";
import styles from "./styles.module.scss";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonPropsType) => {
  const classNames = joinClassNames(
    styles.button,
    styles[size],
    styles[variant],
    className,
  );

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};

export { Button };
