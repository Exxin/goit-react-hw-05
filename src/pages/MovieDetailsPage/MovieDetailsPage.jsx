import { useParams, useLocation, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../moviesApi";
import MovieCard from "../../components/MovieCard/MovieCard";
import css from './MovieDetailsPage'

export default function MovieDetailsPage() {

  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { movieId } = useParams();

  useEffect(() => {

    if (movieId === null) return;

    async function fetchMovieById() {

      try {
        setIsLoading(true);
        const data = await getMovieDetails(movieId);
        setMovieDetails(data);

      } catch (error) {
        setError(error.message);

      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieById();

  }, [movieId]);

  return (
    <>
      {error && <div>Please reload the page</div>}

      {isLoading && <div>Loading...</div>}

      <div className={css.wrap}>
        <NavLink className={css.btn} to={location.state?.from ?? "/"}>Go back</NavLink>
      </div>

      {movieDetails && <MovieCard movieDetails={movieDetails} />}
    </>
  );
}
