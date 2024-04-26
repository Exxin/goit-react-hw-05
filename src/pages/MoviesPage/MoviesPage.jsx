import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovieByQuery } from "../../moviesApi";

import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import Loader from '../../components/Loader/Loader'

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");
  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) return;

    async function getQueryData() {
      try {
        setIsLoading(true);
        const data = await getMovieByQuery(query);
        if (data.length === 0) {
          throw new Error("Sorry, we don't have such movies");
        }
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getQueryData();
  }, [query]);

  const handleSearch = (value) => {
    setSearchParams({ query: value, page });
  };

  return (
    <>
      {error && <p>Sorry, we don't have such movies</p>}
      
      {isLoading && <Loader isLoading={isLoading}/>}

      <SearchForm onSubmit={handleSearch} />

      {movies.length > 0 && <MovieList items={movies} />}
    </>
  );
}
