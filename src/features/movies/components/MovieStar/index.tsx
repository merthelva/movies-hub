import Image from "next/image";

import type { MovieStarPropsType } from "./component.type";
import styles from "./styles.module.scss";
import { PersonAvatar } from "./PersonAvatar";

import { TMDB_IMAGE_BASE_URL } from "@/common/constants/tmdb-image-base-url.constant";

const MovieStar = ({ name, character, profilePath }: MovieStarPropsType) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        {profilePath ? (
          <Image
            src={`${TMDB_IMAGE_BASE_URL}${profilePath}`}
            alt={name}
            fill
            className={styles.avatar}
            sizes="96px"
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            <PersonAvatar />
          </div>
        )}
      </div>
      <span className={styles.name}>{name}</span>
      <span className={styles.character}>{character}</span>
    </div>
  );
};

export { MovieStar };
