import type { ListSelectVariantPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/Button";

const ListSelectVariant = ({
  lists,
  movieListIds,
  onAdd,
  onRemove,
}: ListSelectVariantPropsType) => (
  <ul className={styles.listSelectVariant}>
    {lists.map((list) => {
      const isInList = new Set(movieListIds).has(list.id);
      return (
        <li key={list.id} className={styles.listSelectItem}>
          <span>{list.name}</span>
          <Button
            variant={isInList ? "secondary" : "primary"}
            componentSize="sm"
            onClick={
              isInList
                ? onRemove.bind(null, list.id)
                : onAdd.bind(null, list.id)
            }
          >
            {isInList ? "Remove" : "Add"}
          </Button>
        </li>
      );
    })}
  </ul>
);

export { ListSelectVariant };
