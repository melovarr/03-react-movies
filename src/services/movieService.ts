import axios from "axios";
import type { Movie } from "../types/movies";
const url = "https://api.themoviedb.org/3/search/movie";

interface MoviesHttpResponse {
  hits: Movie[];
}
export const fetchMovies = async (topic: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesHttpResponse>(
    `https://api.themoviedb.org/3/search/movie?query=${topic}&include_adult=false&language=en-US&page=1`
  );
  return response.data.hits;
};
