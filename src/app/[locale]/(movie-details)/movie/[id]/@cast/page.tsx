import { Alert } from "@/components/ui/Alert";
import { MovieStar } from "@/features/movies/components/MovieStar";
import { getMovieCast } from "@/features/movies/services";
import styles from "./styles.module.scss";

export default async function CastPage({
  params,
}: PageProps<"/[locale]/movie/[id]">) {
  const { id } = await params;

  const response = await getMovieCast(+id);

  if (response.status === "error") {
    return (
      <Alert
        content="An error occurred while fetching the cast."
        variant="error"
      />
    );
  }

  if (response.data.length === 0) {
    return (
      <Alert content={`No cast is found for this movie.`} variant="info" />
    );
  }

  return (
    <section className={styles.cast}>
      <h2 className={styles.title}>Cast</h2>
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
