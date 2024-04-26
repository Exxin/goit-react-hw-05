import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../moviesApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from '../../components/Loader/Loader';
import css from './HomePage.module.css';

export default function HomePage() {

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    async function fetchMovies() {

      try {
        setIsLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);

      } catch (error) {
        setError(error.message);

      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();

  }, []);

  return (
    <div className={css.wrapper}>

      <h2 className={css.title}>Trending today</h2>

      {error && <div>Please reload the page</div>}

      {isLoading && <Loader isLoading={isLoading}/>}

      {movies.length > 0 && <MovieList items={movies} />}
    </div>
  );
}
