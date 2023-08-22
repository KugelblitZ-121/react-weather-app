import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../API/search-api";

function TempForecast() {
  const { forcastData, toCil, tempData } = useContext(SearchContext);

  const forcastDataArray = [];
  const lowTempArray = [];
  for (let i = 4; i < forcastData.length; i += 8) {
    forcastDataArray.push(forcastData[i]);
  }
  for (let i = 1; i < forcastData.length; i += 8) {
    lowTempArray.push(forcastData[i]);
  }
  const [futureDays, setFutureDays] = useState([]);
  useEffect(() => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const futureDayNames = dayNames.slice(currentDayIndex + 1).concat(dayNames.slice(0, currentDayIndex));
    setFutureDays(futureDayNames);
  }, []);
  return (
    <div className="flex flex-wrap justify-center mt-5">
      {forcastData &&
        tempData &&
        forcastDataArray.map((element, index) => (
          <div className="rounded overflow-hidden shadow-lg m-2" key={element.dt}>
            <div
              className={`relative grid grid-cols-2 px-6 py-4 justify-items-center content-center ${
                element.weather[0].main === "Clear"
                  ? "bg-yellow-300"
                  : element.weather[0].main === "Clouds" || element.weather[0].main === "Snow"
                  ? "bg-sky-200"
                  : "bg-sky-800"
              }`}
            >
              <img
                src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`}
                width="100%"
                height="100%"
                className="p-0 m-0"
              />

              {/* <span className="font-bold text-4xl flex items-center">H: {toCil(element.main.temp_max)}&deg;</span> */}
              <div className="flex flex-col justify-center items-center px-7 font-bold text-xl">
                <span>H: {toCil(element.main.temp_max)}&deg;</span>

                <span>L: {toCil(lowTempArray[index].main.temp_min)}&deg;</span>
              </div>
            </div>
            <div className="pt-4 pb-4 text-center text-2xl text-white">
              <span>{futureDays[index]}</span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TempForecast;
