import type { ErrorVariantPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/Button";

const ErrorVariant = ({ message, onClose }: ErrorVariantPropsType) => (
  <div className={styles.errorVariant}>
    <p className={styles.errorMessage}>{message}</p>
    <Button variant="primary" size="md" onClick={onClose}>
      Close
    </Button>
  </div>
);

export { ErrorVariant };
