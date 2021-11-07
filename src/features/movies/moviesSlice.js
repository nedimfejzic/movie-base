import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../api/movieApi";
import { APIKey } from "../../api/movieApiKey";

const initialState = {
  movieList: [],
  seriesList: [],
  singleMovieOrSeries: {},
  statusMovies: "idle",
  statusSeries: "idle",
};

export const fetchMoviesAsync = createAsyncThunk(
  "movies/fetchMoviesAsync",
  async () => {
    const searchText = "Fast";
    const response = await movieApi
      .get(`?apiKey=${APIKey}&s=${searchText}&type=movie`)
      .catch((err) => {
        console.log(err);
      });
    return response.data;
  }
);

export const fetchSeriesAsync = createAsyncThunk(
  "movies/fetchSeriesAsync",
  async () => {
    const searchText = "Fast";
    const response = await movieApi
      .get(`?apiKey=${APIKey}&s=${searchText}&type=series`)
      .catch((err) => {
        console.log(err);
      });
    return response.data;
  }
);
export const fetchSingleMovieOrSeriesDetailAsync = createAsyncThunk(
  "movies/fetchSingleMovieOrSeriesDetailAsync",
  async (id) => {
    const searchText = "Fast";
    const response = await movieApi
      .get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
      .catch((err) => {
        console.log(err);
      });
    console.log("SINGLE SHOW: ", response.data);
    return response.data;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, { payload }) => {
      state.movieList = payload;
    },
  },
  extraReducers: {
    [fetchMoviesAsync.pending]: (state) => {
      return { ...state, statusMovies: "loading" };
    },
    [fetchMoviesAsync.fulfilled]: (state, { payload }) => {
      return { ...state, movieList: payload, statusMovies: "finished" };
    },
    [fetchMoviesAsync.rejected]: () => {
      console.log("Rejected");
    },
    [fetchSeriesAsync.fulfilled]: (state, { payload }) => {
      console.log("Fetched data");
      return { ...state, seriesList: payload, statusSeries: "finished" };
    },
    [fetchSingleMovieOrSeriesDetailAsync.pending]: (state) => {
      return {
        ...state,
        statusMovies: "loading",
      };
    },
    [fetchSingleMovieOrSeriesDetailAsync.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        singleMovieOrSeries: payload,
        statusMovies: "finished",
      };
    },
  },
});

export const selectAllMovies = (state) => state.movies.movieList;
export const selectAllSeries = (state) => state.movies.seriesList;
export const loadingMovies = (state) => state.movies.statusMovies;
export const loadingSeries = (state) => state.movies.statusSeries;
export const singleMovieOrSeries = (state) => state.movies.singleMovieOrSeries;

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
