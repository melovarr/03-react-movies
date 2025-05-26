import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";
import toast from "react-hot-toast";
import ToasterMessage from "../Toaster/Toaster";
import Loader from "../Loader/Loader";
import "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  const handleSearch = async (topic: string) => {
    setIsLoading(true);
    setIsError(false);
    setMovies([]);
    try {
      const data = await fetchMovies(topic);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
      } else {
        setMovies(data);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  function selectMovie(movie: Movie | null): void {
    setSelectedMovie(movie);
  }
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      <MovieGrid onSelect={selectMovie} movies={movies} />
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={setSelectedMovie} />
      )}
      <ToasterMessage />
    </>
  );
}
