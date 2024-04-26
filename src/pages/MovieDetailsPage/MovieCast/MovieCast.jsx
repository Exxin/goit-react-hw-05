import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../../moviesApi";
import css from "./MovieCast.module.css";
import Loader from '../../../components/Loader/Loader'

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

    useEffect(() => {
    if (!movieId === null) return;
    async function getCastInfo() {
      try {
        setIsLoading(true);
        const dataCast = await getMovieCast(movieId);
        if (dataCast.length === 0) {
          throw new Error("Sorry, no information about cast");
        }
        setCast(dataCast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCastInfo();
  }, [movieId]);

  return (
    <>
      <div>
        {error && <div>Sorry, no information about cast</div>}

        {isLoading && <Loader isLoading={isLoading}/>}
        
        <ul className={css.list}>
          {cast &&
            cast.map(({ id, original_name, profile_path, character }) => {
              return (
                <li className={css.listitem} key={id}>
                  <img src={profile_path} alt={original_name} />
                  <p className={css.name}>{original_name}</p>
                  <p className={css.text}>{character}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
