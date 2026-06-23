import styles from "./styles.module.scss";

import { Alert } from "@/components/ui/Alert";
import { getMovieTrailer } from "@/features/movies/services";

export default async function TrailerPage({
  params,
}: PageProps<"/[locale]/movie/[id]">) {
  const { id } = await params;

  const response = await getMovieTrailer(+id);

  if (response.status === "error" || !response.data) {
    return (
      <Alert
        content="An error occurred, while trying to fetch movie trailer."
        variant="error"
      />
    );
  }

  const { key, site, type } = response.data;

  if (site.toLowerCase() !== "youtube" || type.toLowerCase() !== "trailer") {
    return null;
  }

  return (
    <section className={styles.trailer}>
      <h2 className={styles.title}>Trailer</h2>
      <div className={styles.embedWrapper}>
        <iframe
          src={`https://www.youtube.com/embed/${key}?playsinline=1`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          className={styles.embed}
        />
      </div>
    </section>
  );
}
