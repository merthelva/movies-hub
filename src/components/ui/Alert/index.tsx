import { serializeMessage } from "@/common/utils/serialize-message.util";
import type { AlertPropsType } from "./component.type";
import styles from "./styles.module.scss";
import { Message } from "@/components/ui/Message";
import { joinClassNames } from "@/common/utils/join-classnames.util";

const Alert = ({ content, variant, role = "status" }: AlertPropsType) => {
  return (
    <div className={joinClassNames(styles.alert, styles[variant])} role={role}>
      {typeof content === "string" ? (
        <Message
          variant={variant}
          content={serializeMessage(variant, content)}
        />
      ) : (
        <>{content}</>
      )}
    </div>
  );
};

export { Alert };
