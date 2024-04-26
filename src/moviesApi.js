import axios from "axios";

const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmVhOGRlNDY5ZWM4MzIyMTBkZmU4ZGJhOGYwN2MwNyIsInN1YiI6IjY2MmI0ZjE3ZTI5NWI0MDExZjEzZjkzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WkfU5DOa7YOercwKQlmZc4Upst9aqkEin_c5Yc1UxtI.tuq3yC-UPvU6NwDPstwNo0Ndob916kllARJmHlVmcNc";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

const API_KEY = "fbea8de469ec832210dfe8dba8f07c07";

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
