import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ items }) {
  const location = useLocation();
  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {items.map(({ id, title }) => (
          <li key={id}>
            <Link state={{ from: location }} to={`/movies/${id}`}>
              <h3 className={css.listitem}>{title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
