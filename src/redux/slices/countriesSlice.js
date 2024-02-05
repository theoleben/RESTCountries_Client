import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  COUNTRY,
  REGION,
  SUBREGION,
  exceptions_ANTARTIC,
} from "../../constants";

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

// Region, subregion and country
const selectName = (state, name) => name;

export const selectCountryByType = createSelector(
  [selectAllCountries, selectName], // Liste des sélecteurs d'entrée
  (countries, id) => {
    // console.log("Output selector running");
    // console.log("name :", name);

    let data = null;
    let type = "";
    let name = "";
    if (id) {
      const level = id.match(/^(.*)(?=_)/);
      const nameItem = id.match(/[^_]*$/);
      // console.log("level :", level);
      // console.log("nameItem :", nameItem);

      if (level && nameItem) {
        type = level[1];
        name = nameItem[0];
        // console.log("type :", type);
        // console.log("name :", name);

        // console.log(exceptions_ANTARTIC.includes(name));

        switch (type) {
          case REGION:
            data = countries.filter((country) => country.region === name);
            break;
          case SUBREGION:
            if (exceptions_ANTARTIC.includes(name)) {
              data = countries.find((country) => country.name.common === name);
            } else {
              data = countries.filter((country) => country.subregion === name);
            }
            break;
          case COUNTRY:
            data = countries.find((country) => country.name.common === name);
            break;
          default:
            break;
        }
      } else {
        console.log("Aucune correspondance trouvée dans la chaîne.");
      }
    }

    return [type, name, data];
  }
);

export const getCountriesStatus = (state) => {
  //   console.log(state);
  return state.status;
};

export default countriesSlice;
