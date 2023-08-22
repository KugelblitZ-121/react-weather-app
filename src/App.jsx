import { useContext } from "react";
import MainTempCard from "./components/MainTempCard";
import SearchBar from "./components/SearchBar";
import { SearchContext } from "./API/search-api";
import TempForecast from "./components/TempForecast";

function App() {
  const { isLoading } = useContext(SearchContext);
  return (
    <div className="">
      <h1 className="text-3xl text-center m-10">Welcome to my weather app. Designed by KugelblitZ</h1>
      <div className="flex flex-col items-center">
        <SearchBar></SearchBar>
        {!isLoading ? (
          <div className="w-full">
            <MainTempCard></MainTempCard>

            <TempForecast></TempForecast>
          </div>
        ) : (
          <div
            className="inline-block mt-10 h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        )}
      </div>
    </div>
  );
}

export default App;
