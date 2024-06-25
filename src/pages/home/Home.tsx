import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getWeatherOfCityByCity } from "../../api/api";
import { setInpSearchValue } from "../../reducers/weatherStates";

const Home = () => {
  const dispatch = useAppDispatch();

  // States from React
  const inpSearchValue = useAppSelector(
    (state) => state.weatherStates.inpSearchValue
  );

  useEffect(() => {
    dispatch(getWeatherOfCityByCity(inpSearchValue));
  }, [dispatch, inpSearchValue]);

  return (
    <>
      <div className="home_component flex justify-center items-center min-h-[70vh]">
        <div className="block_search_countries_and_their_weather border-[1px] border-[#000] w-[300px] p-4 flex flex-col rounded-md">
          <TextField
            id="filled-basic"
            label="Search City"
            value={inpSearchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setInpSearchValue(event.target.value))
            }
            variant="filled"
          />
          <div className="block_for_founded_city"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
