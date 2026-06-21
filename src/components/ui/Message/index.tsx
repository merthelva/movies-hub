import { joinClassNames } from "@/common/utils/join-classnames.util";
import type { MessagePropsType } from "./component.type";
import styles from "./styles.module.scss";

const Message = ({
  content,
  variant,
  renderAs = "span",
  ...props
}: MessagePropsType) =>
  renderAs === "span" ? (
    <span
      {...props}
      id={props.id}
      aria-atomic={false}
      aria-live="polite"
      aria-relevant="additions text"
      className={joinClassNames(styles.message, props.className)}
    >
      {content}
    </span>
  ) : (
    <p
      {...props}
      id={props.id}
      aria-atomic={false}
      aria-live="polite"
      aria-relevant="additions text"
      className={joinClassNames(
        styles.message,
        styles[variant],
        props.className,
      )}
    >
      {content}
    </p>
  );

export { Message };
