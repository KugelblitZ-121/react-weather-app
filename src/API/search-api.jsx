import React, { useState } from "react";
import axios from "axios";

const SearchContext = React.createContext({
  getDailyWeather: async () => {},
  getForcast: async () => {},
  toCil: () => {},
  tempData: {},
  forcastData: [],
  isLoading: false,
  city: "",
  errorMsg: "",
});

const SearchProvider = ({ children }) => {
  const [tempData, setTempData] = useState();
  const [forcastData, setForcastData] = useState([]);
  //let forcastData = [];
  const [isLoading, setIsLoading] = useState();
  const [city, setCity] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const getDailyWeather = async (city) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=83f967263606a2a4c4d3a5ab3ade2639`
      );
      setCity(response.data.name);
      setTempData(response.data);
      getForcast(city);
    } catch (err) {
      setTempData(null);
      setErrorMsg(err.response.data.message);
    }
    setIsLoading(false);
  };
  const getForcast = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=83f967263606a2a4c4d3a5ab3ade2639`
      );
      const today = new Date().getDate();
      let temp = [];
      response.data.list.forEach((element) => {
        if (element.dt_txt.slice(8, 10) != today) {
          temp.push(element);
        }
      });
      setForcastData(temp.slice(0, 32));
    } catch (err) {
      console.log(err);
    }
  };
  const toCil = (temp) => {
    const finelTemp = temp - 273.15;
    return finelTemp.toFixed();
  };

  return (
    <SearchContext.Provider
      value={{
        getDailyWeather: getDailyWeather,
        getForcast: getForcast,
        toCil: toCil,
        tempData: tempData,
        forcastData: forcastData,
        isLoading: isLoading,
        city: city,
        errorMsg: errorMsg,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
