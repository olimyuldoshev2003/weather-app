import React, { useEffect } from "react";
import "./style.css";

import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getWeatherOfCityByCity } from "../../api/api";
import { setInpSearchValue } from "../../reducers/weatherStates";

//Material Icons

//Images
import cloudyImg from "../../assets/Cloudy.svg";
import clearImg from "../../assets/Clear.svg";
import rainyImg from "../../assets/Rainy.svg";
import humidityImg from "../../assets/humidity-icon.png";
import windImg from "../../assets/wind-icon.png";

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
      <div className="home_component flex flex-col gap-3 justify-center items-center min-h-[96.5vh]">
        <h1 className="max-w-[300px] text-center text-white font-bold text-[24px]">Search the cities for seeing the weather on that city</h1>
        <div className="block_search_countries_and_their_weather border-[1px] border-none outline-none w-[300px] p-4 flex flex-col rounded-md dark:bg-[#fff]">
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
              <div className="px-2 py-2 rounded-[0_0_10px_10px]">
                <h1 className="text-white text-center">Loading...</h1>
              </div>
            ) : (
              <>
                {inpSearchValue.trim().length === 0 ? (
                  <>{/* <h1>Please fill this field up with city</h1> */}</>
                ) : cityDataWeather === undefined &&
                  inpSearchValue.trim().length !== 0 ? (
                  <div className=" px-3 py-3 rounded-[0_0_10px_10px] mt-[30px]">
                    <h1 className="text-[#ad0101] text-center">
                      <span className="font-bold">{inpSearchValue}</span> isn't
                      the city. You must write the city correctly.
                    </h1>
                  </div>
                ) : (
                  <div className=" px-2 py-2 rounded-[0_0_10px_10px] mt-[10px]">
                    <div className="block_for_img_weather_and_city flex flex-col items-center">
                      <h1 className="text-white text-start">
                        {cityDataWeather?.weather?.at(0)?.main}
                      </h1>
                      {cityDataWeather?.weather?.at(0)?.main === "Clouds" ? (
                        <img className="w-[12rem]" src={cloudyImg} alt="" />
                      ) : cityDataWeather?.weather?.at(0)?.main === "Clear" ? (
                        <img className="w-[12rem]" src={clearImg} alt="" />
                      ) : cityDataWeather?.weather?.at(0)?.main === "Rain" ? (
                        <img className="w-[12rem]" src={rainyImg} alt="" />
                      ) : null}

                      <h1 className="text-center text-white text-[31px] font-bold">
                        {Math.ceil(cityDataWeather?.main?.temp - 273)}
                        <sup>o</sup>C
                      </h1>
                      <h1 className="text-center text-white text-[31px] font-bold">
                        {cityDataWeather?.name}
                      </h1>
                    </div>
                    <div className="humidity_wind_block w-[100%] flex justify-between mt-5 px-4 gap-4">
                      <div className="humidity_block flex items-center gap-1">
                        <img
                          src={humidityImg}
                          className="w-[30px] h-[30px]"
                          alt=""
                        />
                        <div className="block_number_text_humidity">
                          <h1 className="text-white text-[12px]">
                            {cityDataWeather?.main?.humidity}%
                          </h1>
                          <h1 className="text-white text-[12px]">Humidity</h1>
                        </div>
                      </div>
                      <div className="wind_block flex items-center gap-1">
                        <img
                          src={windImg}
                          className="w-[30px] h-[30px]"
                          alt=""
                        />
                        <div className="block_number_text_wind">
                          <h1 className="text-white text-[12px]">
                            {cityDataWeather?.wind?.speed}km/h
                          </h1>
                          <h1 className="text-white text-[12px]">Wind Speed</h1>
                        </div>
                      </div>
                    </div>
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
