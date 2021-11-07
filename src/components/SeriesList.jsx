import { useSelector } from "react-redux";
import {
  loading,
  loadingSeries,
  selectAllSeries,
  selectAllseries,
} from "../features/movies/moviesSlice";
import Loader from "react-loader-spinner";

const SeriesList = () => {
  const series = useSelector(selectAllSeries);
  const loadingMsg = useSelector(loadingSeries);

  let response = (
    <div className="grid place-items-center h-screen">
      <Loader type="TailSpin" color="#6366F1" height={150} width={150} />
    </div>
  );

  if (loadingMsg === "finished") {
    console.log("series STATUS", series);
    if (series.Response === "False") {
      response = (
        <div>
          <p>Error</p>
          <p className="text-red-400">{series.Error}</p>
        </div>
      );
    } else {
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
                      <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
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
                      </a>
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
