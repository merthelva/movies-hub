import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type {
  DialogListCreateFormType,
  ListCreateVariantPropsType,
} from "./component.type";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/Button";
import { joinClassNames } from "@/common/utils/join-classnames.util";

const listCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
});

const ListCreateVariant = ({
  onCreate,
  onClose,
}: ListCreateVariantPropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DialogListCreateFormType>({
    resolver: zodResolver(listCreateSchema),
  });

  const handleClearAndClose = () => {
    reset();
    onClose();
  };

  const handleCreate = async (data: DialogListCreateFormType) => {
    await onCreate(data);
    handleClearAndClose();
  };

  return (
    <form
      className={styles.listCreateVariant}
      onSubmit={handleSubmit(handleCreate)}
    >
      {/* TODO: Replace this with ui/Input component */}
      <div className={styles.field}>
        <label htmlFor="list-name" className={styles.label}>
          List Name
        </label>
        <input
          id="list-name"
          className={joinClassNames(
            styles.input,
            errors.name ? styles.inputError : "",
          )}
          aria-describedby="list-name-error"
          placeholder="My Movie List"
          {...register("name")}
        />
        {errors.name != null && (
          <span
            id="list-name-error"
            aria-atomic={false}
            aria-live="polite"
            aria-relevant="additions text"
            className={styles.fieldError}
          >
            {errors.name.message}
          </span>
        )}
      </div>
      <div className={styles.formActions}>
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={handleClearAndClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

export { ListCreateVariant };
