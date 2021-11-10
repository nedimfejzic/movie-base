const ErrorComponent = ({ errorMessage = "" }) => {
  if (errorMessage === "Incorrect IMDb ID.") {
    errorMessage = "Please enter different search term...";
  }

  return (
    <div className="text-center text-red-400 ">
      <p className="font-extralight text-xl">Error</p>
      <p className="font-light text-3xl">{errorMessage}</p>
    </div>
  );
};

export default ErrorComponent;
