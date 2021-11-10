import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MoviesList from "../components/MoviesList";
import SeriesList from "../components/SeriesList";
import {
  fetchMoviesAsync,
  fetchSeriesAsync,
} from "../features/movies/moviesSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMoviesAsync());
    dispatch(fetchSeriesAsync());
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <h3 className="text-2xl pl-3 text-indigo-500">Movies:</h3>
      <MoviesList />

      <h3 className="text-2xl pl-3 text-indigo-500">Series:</h3>
      <SeriesList />
    </div>
  );
};

export default HomePage;
