import "./style.css"

import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getWeatherOfCityByCity } from "../../api/api";
import { setInpSearchValue } from "../../reducers/weatherStates";

//Images

import cloudyImg from "../../assets/Cloudy.svg"
import clearImg from "../../assets/Clear.svg"
import rainyImg from "../../assets/Rainy.svg"
import humidityImg from "../../assets/humidity-icon.png"
import wingImg from "../../assets/wind-icon.png"

const Home = () => {
  const dispatch = useAppDispatch();

  // States from React
  const inpSearchValue = useAppSelector(
    (state) => state.weatherStates.inpSearchValue
  );

  const cityDataWeather = useAppSelector(
    (state) => state.weatherStates.cityDataWeather
  );

  const loadingCityDataWeather = useAppSelector(
    (state) => state.weatherStates.loadingCityDataWeather
  );

  useEffect(() => {
    if (inpSearchValue.trim().length !== 0) {
      dispatch(getWeatherOfCityByCity(inpSearchValue));
    }
  }, [dispatch, inpSearchValue]);

  return (
    <>
      <div className="home_component flex justify-center items-center min-h-[70vh]">
        <div className="block_search_countries_and_their_weather border-[1px] border-[#000] w-[300px] p-4 flex flex-col rounded-md dark:bg-[#fff]">
          <TextField
            id="filled-basic"
            label="Search City"
            value={inpSearchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setInpSearchValue(event.target.value))
            }
            className="dark:bg-[#fff] bg-[#eceaea]"
            variant="filled"
          />
          <div className="block_for_founded_city">
            {loadingCityDataWeather ? (
              <div className=" px-2 py-2 rounded-[0_0_10px_10px]">
                <h1>Loading...</h1>
              </div>
            ) : (
              <>
                {inpSearchValue.trim().length === 0 ? (
                  <>{/* <h1>Please fill this field up with city</h1> */}</>
                ) : cityDataWeather === undefined &&
                  inpSearchValue.trim().length !== 0 ? (
                  <div className=" px-2 py-2 rounded-[0_0_10px_10px]">
                    <h1>
                      <span className="font-bold">{inpSearchValue}</span> isn't
                      found
                    </h1>
                  </div>
                ) : (
                  <div className=" px-2 py-2 rounded-[0_0_10px_10px]">
                    {cityDataWeather?.weather[0]?.main === "Clouds" ? (
                      <img src={cloudyImg} alt="" />
                    ) : null}

                    <h1 className="text-center text-white text-[31px] font-bold">
                      {cityDataWeather.name}
                    </h1>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
