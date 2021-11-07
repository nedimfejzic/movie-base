import { useSelector } from "react-redux";
import {
  loading,
  loadingSeries,
  selectAllSeries,
  selectAllseries,
} from "../features/movies/moviesSlice";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

const SeriesList = () => {
  const series = useSelector(selectAllSeries);
  const status = useSelector(loadingSeries);

  let response = "";

  if (status === "loading" || Object.keys(series).length === 0) {
    response = (
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

  if (status === "error" || series.Response === "False") {
    response = (
      <div>
        <p>Error</p>
        <p className="text-red-400">{series.Error}</p>
      </div>
    );
  }

  if (status === "finished" && Object.keys(series).length > 0) {
    {
      response = (
        <div>
          <div className="flex flex-wrap -mx-1 overflow-hidden container p-2">
            {series.Search.map((serie) => (
              <div
                className="my-1 px-1 overflow-hidden sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/5 w-full transform transition duration-500 hover:scale-95"
                key={serie.imdbID}
              >
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    className="lg:h-auto md:h-36 w-full object-cover object-center"
                    src={serie.Poster}
                    alt={serie.Title}
                  />
                  <div className="p-6">
                    <div className="flex justify-between">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        {serie.Year}
                      </h2>
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        {serie.imdbID}
                      </h2>
                    </div>

                    <h1 className="title-font text-2xl font-medium text-gray-900 mb-3">
                      {serie.Title}
                    </h1>
                    <div className="flex items-center flex-wrap">
                      <Link
                        to={`/movie/${serie.imdbID}`}
                        className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                      >
                        Learn More
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  return response;
};

export default SeriesList;
