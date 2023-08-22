import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../API/search-api";

function TempForecast() {
  const { forcastData, toCil, tempData } = useContext(SearchContext);
  const startingIndex = 4;
  const skipCount = 8;

  const forcastDataArray = [];
  for (let i = startingIndex; i < forcastData.length; i += skipCount) {
    forcastDataArray.push(forcastData[i]);
  }
  console.log(forcastDataArray);

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
                  : element.weather[0].main === "Clouds"
                  ? "bg-sky-200"
                  : "bg-sky-900"
              }`}
            >
              <img
                src={`${
                  element.weather[0].main === "Clear"
                    ? "/src/assets/animated/day.svg"
                    : element.weather[0].main === "Clouds"
                    ? "/src/assets/animated/cloudy-day-3.svg"
                    : element.weather[0].main === "Rain"
                    ? "/src/assets/animated/rainy-3.svg"
                    : element.weather[0].main === "Snow"
                    ? "/src/assets/animated/snowy-6.svg"
                    : element.weather[0].main === "Thunderstorm"
                    ? "/src/assets/animated/thunder.svg"
                    : "/src/assets/animated/snowy-1.svg"
                }`}
                width="100%"
                height="100%"
                className="p-0 m-0"
              />

              <span className="font-bold text-4xl flex items-center">{toCil(element.main.temp_max)}&deg;</span>
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
