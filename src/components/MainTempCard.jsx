import { useContext } from "react";
import { SearchContext } from "../API/search-api";
import { BsDroplet } from "react-icons/bs";
import { CiTempHigh } from "react-icons/ci";
import { TbClockHour12 } from "react-icons/tb";

export default function MainTempCard() {
  const { tempData, errorMsg, toCil } = useContext(SearchContext);

  const weatherCondition = tempData?.weather[0].main;
  const weatherDescription = tempData?.weather[0].description;
  const weatherIcon = tempData?.weather[0].icon;
  return (
    <div className="flex flex-col items-center m-7">
      {tempData ? (
        <div className="w-80 md:w-96 rounded overflow-hidden shadow-lg">
          <div
            className={`relative grid grid-cols-2 px-6 py-4 ${
              weatherCondition === "Clear" && weatherIcon === "01d"
                ? "bg-yellow-500"
                : weatherCondition === "Rain"
                ? "bg-sky-900"
                : "bg-gray-500"
            }`}
          >
            <img
              src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              width="90%"
              height="90%"
              className="p-0 mb-5"
            />

            <div className="flex flex-col justify-center items-center">
              <span className="font-bold text-6xl mb-5">{toCil(tempData.main.temp)}&deg;</span>

              <div className="text-lg absolute bottom-0 right-0 px-5 pt-10 flex flex-col items-end">
                <span className="self-end font-bold text-2xl">{weatherDescription}</span>
                {tempData.name.toUpperCase()} - {tempData.sys.country}
              </div>
            </div>
          </div>
          <div className="pt-4 pb-2">
            <div className="flex justify-between px-7 text-white">
              <span className="flex flex-row items-center">
                <CiTempHigh />
                <span className="ml-1">Feels like</span>
              </span>
              <span>{toCil(tempData.main.feels_like + 1)}&deg;</span>
            </div>
            <div className="flex justify-between px-7 text-white">
              <span className="flex flex-row items-center">
                <BsDroplet />
                <span className="ml-1">Humidity</span>
              </span>
              <span>{tempData.main.humidity}%</span>
            </div>
            <div className="flex justify-between px-7 text-white">
              <span className="flex flex-row items-center">
                <TbClockHour12 />
                <span className="ml-1">Pressure</span>
              </span>
              <span>{tempData.main.pressure}&nbsp;hPa</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={`text-2xl text-red-500 ${errorMsg ? "border border-red-500 p-5 rounded" : ""}`}>{errorMsg}</div>
      )}
    </div>
  );
}
