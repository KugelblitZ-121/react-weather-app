import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../API/search-api";

function TempForecast() {
  const { forcastData, toCil, tempData } = useContext(SearchContext);

  const forcastDataArray = [];
  const maxTemps = [];
  const minTemps = [];
  let index = 0;
  for (let i = 7; i < forcastData.length; i += 8) {
    forcastDataArray.push(forcastData[i - 3]);
    let maxTemp = 0;
    let minTemp = 1000;
    for (let j = index; j <= i; j++) {
      if (maxTemp < forcastData[j].main.temp_max) {
        maxTemp = forcastData[j].main.temp_max;
      }
      if (minTemp > forcastData[j].main.temp_min) {
        minTemp = forcastData[j].main.temp_min;
      }
    }
    index = i;
    maxTemps.push(maxTemp);
    minTemps.push(minTemp);
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
              <div className="flex flex-row">
                <div className="flex flex-col justify-center px-2 font-bold text-3xl">
                  <span>H</span>
                  <span>L</span>
                </div>
                <div className="flex flex-col justify-center pr-1 font-bold text-3xl">
                  <span>:</span>
                  <span>:</span>
                </div>
                <div className="flex flex-col justify-center px-2 font-bold text-3xl">
                  <span>{toCil(maxTemps[index])}&deg;</span>
                  <span>{toCil(minTemps[index])}&deg;</span>
                </div>
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
