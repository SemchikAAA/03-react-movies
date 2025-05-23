import styles from "./App.module.css";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useState } from "react";
import { type Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [selectedMovie, isSelectedMovie] = useState<Movie | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const open = (movie: Movie) => {
    setIsOpen(true);
    isSelectedMovie(movie);
  };
  const close = () => {
    setIsOpen(false);
    isSelectedMovie(null);
  };

  const notify = () => toast.error("No movies found for your request.");

  const handleOrder = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetchMovies(query);

      setMovies(res);

      if (res.length === 0 && query.length > 0) {
        notify();
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleOrder} />
      <Toaster />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid onSelect={open} movies={movies} />}
      {isOpen && <MovieModal onClose={close} movie={selectedMovie} />}
    </div>
  );
}
