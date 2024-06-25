import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getWeatherOfCityByCity } from "../api/api";

export interface IWeatherStates {
  inpSearchValue: string;
  cityDataWeather: any;
  loadingCityDataWeather: boolean;
}

const initialState: IWeatherStates = {
  inpSearchValue: "",
  cityDataWeather: [],
  loadingCityDataWeather: false,
};

export const weatherSlice = createSlice({
  name: "weatherStates",
  initialState,
  reducers: {
    setInpSearchValue(state: IWeatherStates, action: PayloadAction<string>) {
      state.inpSearchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWeatherOfCityByCity.pending, (state: IWeatherStates) => {
      state.loadingCityDataWeather = true;
    });
    builder.addCase(
      getWeatherOfCityByCity.fulfilled,
      (state: IWeatherStates, action: PayloadAction<any>) => {
        state.cityDataWeather = action.payload;
        state.loadingCityDataWeather = false;
      }
    );
    builder.addCase(
      getWeatherOfCityByCity.rejected,
      (state: IWeatherStates) => {
        state.loadingCityDataWeather = false;
      }
    );
  },
});

export const { setInpSearchValue } = weatherSlice.actions;

export default weatherSlice.reducer;
