import "./App.css";
import FullForecast from "./FullForecast";
import Home from "./Home";
import { BrowserRouter , Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import getFormatedWeatherData from "./Services/WeatherService";
import Login from "./Auth/Login";

const App = () => {

  const [query, setQuery] = useState({q:localStorage.getItem('city')}); 
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {

    const fetchWeatherData = async () => {
      await getFormatedWeatherData({...query, units}).then((data) => {
        setWeather(data);
        console.log(data)
      });
      
    };
  
    fetchWeatherData();

  }, [query, units]);



  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Home"  element={<Home/>} />
      <Route path= "/" element={<Login/>} />

      {weather && (
      <Route path="/Forecast" element={<FullForecast weather={weather} items={weather.daily}/>} />
      )}

   </Routes>

  </BrowserRouter>
    
  );
}

export default App;