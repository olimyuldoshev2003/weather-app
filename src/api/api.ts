import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWeatherOfCityByCity = createAsyncThunk(
  "api/getWeatherOfCityByCit",
  async function (city: string) {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=107f07caae17f5283cd85fdf1c8787f2`
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  }
);