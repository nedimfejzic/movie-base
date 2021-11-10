import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  fetchSingleMovieOrSeriesDetailAsync,
  loadingMovies,
  removeSelectedMovieOrShow,
  singleMovieOrSeries,
} from "../features/movies/moviesSlice";
import { AiFillStar } from "react-icons/ai";

const MovieDetailsPage = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const result = useSelector(singleMovieOrSeries);
  const loading = useSelector(loadingMovies);

  useEffect(() => {
    dispatch(fetchSingleMovieOrSeriesDetailAsync(imdbID));

    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);

  let movieDetail = "";
  if (loading === "loading" || Object.keys(result).length === 0) {
    movieDetail = (
      <div className="container bg-white w-full mx-auto mt-4 p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
        <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse"></div>
        <div className="flex flex-col flex-1 gap-5 sm:p-2">
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex">
              <div className="bg-gray-200 w-20 animate-pulse h-8 rounded-2xl "></div>
              <div className="bg-gray-200 w-20 animate-pulse h-8 rounded-2xl ml-2"></div>
              <div className="bg-gray-200 w-20 animate-pulse h-8 rounded-2xl ml-2"></div>
            </div>
            <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          </div>
          <div className="mt-auto flex gap-3">
            <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
            <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
            <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  if (loading === "finished" && Object.keys(result).length > 0) {
    movieDetail = (
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
          <div className="lg:w-1/6 md:w-2/6 w-1/2 mb-10  md:mb-0  ">
            <img
              className="object-cover object-center rounded"
              alt={result.Title}
              src={result.Poster}
            />
          </div>
          <div className="lg:flex-grow md:w-4/6 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <div className="flex mb-5">
              <div className="flex items-center  font-semibold text-yellow-500 ">
                <span className="text-yellow-500 font-normal pr-1">
                  IMDB rating
                </span>

                <AiFillStar />
                {result.imdbRating}
              </div>
              <div className="text-xs px-3 ml-4 font-medium bg-gray-500 bg-opacity-10 text-gray-800 rounded pt-1">
                {result.Year}
              </div>
              <div className="text-xs px-3 ml-4 font-medium bg-gray-500 bg-opacity-10 text-gray-800 rounded pt-1">
                {result.Rated}
              </div>
              <div className="text-xs px-3 ml-4 font-medium bg-gray-500 bg-opacity-10 text-gray-800 rounded pt-1">
                {result.Released}
              </div>
              <div className="text-xs px-3 ml-4 font-medium bg-gray-500 bg-opacity-10 text-gray-800 rounded pt-1">
                {result.Runtime}
              </div>
            </div>
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {result.Title}
            </h1>
            <p className="mb-8 leading-relaxed">{result.Plot}</p>
            <div className="flex-col justify-center">
              {result.Ratings.length > 0 &&
                result.Ratings.map((rejting) => (
                  <p className="flex" key={rejting.Source}>
                    {rejting.Source} - {rejting.Value}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return movieDetail;
};

export default MovieDetailsPage;
