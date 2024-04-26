import axios from "axios";

const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2JkNTc3OTczZTY3NzI3ODFlZTA3YzBkYzdkNWFkOCIsInN1YiI6IjY2MjNlMjQ3YjI2ODFmMDFhOTcyZDA3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tuq3yC-UPvU6NwDPstwNo0Ndob916kllARJmHlVmcNc";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

const API_KEY = "b7bd577973e6772781ee07c0dc7d5ad8";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export const imageBaseURL = "https://image.tmdb.org/t/p";

export async function getTrendingMovies() {
  const { data } = await axios.get(`/trending/movie/week`, {
    params: { api_key: API_KEY },
  });
  return data.results;
}

export async function getMovieByQuery(query) {
  const { data } = await axios.get(`/search/movie`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      query,
    },
  });
  return data.results;
}

export async function getMovieDetails(id) {
  const { data } = await axios.get(`/movie/${id}`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  });
  if (data.poster_path) {
    data.poster_path = `${imageBaseURL}/w300${data.poster_path}`;
  }
  data.release_date = new Date(data.release_date).getFullYear();
  data.vote_average = Math.round(data.vote_average * 10);

  return data;
}

export async function getMovieCast(movieId) {
  const { data } = await axios.get(`/movie/${movieId}/credits`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  });
    const dataCast = data.cast.map(
    ({ id, original_name, profile_path, character }) => ({
      id,
      original_name,
      profile_path: profile_path
        ? 'https://image.tmdb.org/t/p/w200' + profile_path
        : '',
      character,
    })
  );
    return dataCast;
}

export async function getMovieReviews(id) {
  const { data } = await axios.get(
    `/movie/${id}/reviews
`,
    {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    }
  );
  return data.results;
}
