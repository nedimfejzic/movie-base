import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../api/movieApi";
import { APIKey } from "../../api/movieApiKey";

const initialState = {
  movieList: [],
  seriesList: [],
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
      console.log("Pending");

      return { ...state, statusMovies: "loading" };
    },
    [fetchMoviesAsync.fulfilled]: (state, { payload }) => {
      console.log("Fetched data");
      return { ...state, movieList: payload, statusMovies: "finished" };
    },
    [fetchMoviesAsync.rejected]: () => {
      console.log("Rejected");
    },
    [fetchSeriesAsync.fulfilled]: (state, { payload }) => {
      console.log("Fetched data");
      return { ...state, seriesList: payload, statusSeries: "finished" };
    },
  },
});

export const selectAllMovies = (state) => state.movies.movieList;
export const selectAllSeries = (state) => state.movies.seriesList;
export const loadingMovies = (state) => state.movies.statusMovies;
export const loadingSeries = (state) => state.movies.statusSeries;

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
