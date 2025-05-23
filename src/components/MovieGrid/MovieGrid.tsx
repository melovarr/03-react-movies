import type { Movie } from "../../types/movies";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: () => void;
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li>
          <div className={css.card}>
            <img
              className={css.image}
              src={movie.url}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>Movie title</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
