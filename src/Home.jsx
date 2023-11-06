import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import HeaderBtn from "./Components/HeaderBtn";
import SearchLocation from "./Components/SearchLocation";
import TimeAndLocation from "./Components/TimeAndLocation";
import TemperatureDetails from "./Components/TemperatureDetails";
import Forecast from "./Components/Forecast";
import getWeatherData from "./Services/WeatherService";
import getFormatedWeatherData from "./Services/WeatherService";
import { useEffect, useState } from "react";
import FullForecast from "./FullForecast";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState({ q: "Colombo" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  

  useEffect(() => {
    localStorage.setItem("city", query.q);
    const fetchWeatherData = async () => {
      await getFormatedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
        console.log(data);
      });
    };

    fetchWeatherData();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";

    const threshold = units === "metric" ? 20 : 60;

    if (weather.temp <= threshold) return "from-blue-100 to-blue-700";

    return "from-yellow-200 to-orange-500";
  };

  

  return (
    
    <div
      className={`bg-gradient-to-br ${formatBackground()}  h-screen  m-o p-6`}
    >
      <div
        className={`mx-auto max-w-screen-md bg-gradient-to-br ${formatBackground()}  py-5 px-32 h-fit shadow-xl border rounded-3xl`}
      >
        {" "}
        <HeaderBtn setQuery={setQuery} />
        <SearchLocation setQuery={setQuery} units={units} setUnits={setUnits} />
        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureDetails weather={weather} />
            <Forecast weather={weather} items={weather.daily} />
          </div>
        )}
      </div>
    </div>
  );
}