import { joinClassNames } from "@/common/utils/join-classnames.util";
import type { LoadingIndicatorPropsType } from "./component.type";
import styles from "./styles.module.scss";

const LoadingIndicator = ({
  size = "md",
  label = "Loading...",
}: LoadingIndicatorPropsType) => (
  <span
    role="status"
    aria-label={label}
    className={joinClassNames(styles.spinner, styles[size])}
  />
);

export { LoadingIndicator };
