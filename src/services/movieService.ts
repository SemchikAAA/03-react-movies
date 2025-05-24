import axios from "axios";
import { type Movie } from "../types/movie";

interface Movies {
  results: Movie[];
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const myKey = import.meta.env.VITE_API_KEY;

  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  const options = {
    headers: { Authorization: `Bearer ${myKey}` },
  };

  const res = await axios.get<Movies>(url, options);

  return res.data.results;
}
