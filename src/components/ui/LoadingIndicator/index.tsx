import type { LoadingIndicatorPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { joinClassNames } from "@/common/utils/join-classnames.util";

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
