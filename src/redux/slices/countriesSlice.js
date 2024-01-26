import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const GET_COUNTRIES_URL = "https://restcountries.com/v3.1/all";

const initialState = {
  countries: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    // console.log("fetch");
    return fetch(GET_COUNTRIES_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        return data;
      });
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCountries.pending, (state, action) => {
        // console.log("pending");
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        // console.log("fulfilled");
        // console.log(action);
        state.status = "succeeded";
        // return action.payload;
        state.countries.push(...action.payload);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        // console.log("rejected");
        state.status = "failed";
      });
  },
});

// console.log(countriesSlice);

export const selectAllCountries = (state) => {
  //   console.log(state);
  return state.countries;
};

export const selectCountryByName = (state, name) => {
  // console.log(name);
  //   console.log(state);
  return state.countries.find((country) => country.name.common === name);
};

export const selectCountryByCode = (state, code) => {
  // console.log(code);
  //   console.log(state);
  return state.countries.find((country) => country.cca3 === code);
};

export const getCountriesStatus = (state) => {
  //   console.log(state);
  return state.status;
};

export default countriesSlice;
