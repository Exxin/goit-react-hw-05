import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../../moviesApi";
import css from "./MovieReviews.module.css";
import Loader from '../../../components/Loader/Loader'


export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    async function getReviews() {
      try {
        setIsLoading(true);
        const data = await getMovieReviews(movieId);

        if (data.length === 0) {
          throw new Error("Sorry, we have no reviews for this movie");
        }
        setReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <>
      <div>
        {error && <div>Sorry, we have no reviews for this movie</div>}

        {isLoading && <Loader isLoading={isLoading}/>}
        
        <ul className={css.list}>
          {reviews &&
            reviews.map(({ id, author, content }) => {
              return (
                <li className={css.listitem} key={id}>
                  <h3 className={css.title}>Author: {author}</h3>
                  <p className={css.text}>{content}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
