import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movies";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.module.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);

      const data = await fetchMovies(topic);
      if (data.length === 0) {
        alert("No movies found for your request.");
      } else {
        setMovies(data);
      }

      console.log(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  function selectMovie(movie: Movie): void {
    setSelectedMovie(movie);
  }
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {/* {movies.length > 0 && <MovieGrid movies={movies} />} */}
      <MovieGrid onSelect={selectMovie} movies={movies} />
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={setSelectedMovie} />
      )}
    </>
  );
}

export default App;
