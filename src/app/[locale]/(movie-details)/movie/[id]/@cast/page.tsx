import { getTranslations } from "next-intl/server";

import styles from "./styles.module.scss";

import { Alert } from "@/components/ui/Alert";
import { MovieStar } from "@/features/movies/components/MovieStar";
import { getMovieCast } from "@/features/movies/services";

export default async function CastPage({
  params,
}: PageProps<"/[locale]/movie/[id]">) {
  const { id } = await params;
  const t = await getTranslations("Movie");

  const response = await getMovieCast(+id);

  if (response.status === "error") {
    return <Alert content={t("fetchCastError")} variant="error" />;
  }

  if (response.data.length === 0) {
    return <Alert content={t("noCastFound")} variant="info" />;
  }

  return (
    <section className={styles.cast}>
      <h2 className={styles.title}>{t("cast")}</h2>
      <div className={styles.grid}>
        {response.data.slice(0, 20).map((member) => (
          <MovieStar
            key={member.id}
            name={member.name}
            character={member.character}
            profilePath={member.profilePath}
          />
        ))}
      </div>
    </section>
  );
}
