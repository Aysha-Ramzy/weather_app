import React from "react";
import { iconUrlFromCode } from "../Services/WeatherService";
import { useNavigate } from 'react-router-dom';
import "../App.css";


function Forecast({ items }) {
  // Use slice to get the first three items
  const threeItems = items.slice(0, 3);
  const navigate = useNavigate();

  const handleForecastClick = () => {
    navigate("/Forecast");
    window.location.reload();
  };


  return (
    <div>
     
     <div className="flex items-center justify-between mt-5">
              <p className="text-black text-lg font-medium">Daily Forecast</p>
              <p
                onClick={handleForecastClick} 
                
                className="text-black text-xs font-light  transition ease-in-out hover:scale-90 cursor-pointer"
              >
                View more
              </p>
            </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-black">
        {threeItems.map((item) => (
          <div className="flex flex-col items-center bg-white rounded-3xl p-2 justify-center" key={item.title}>
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              alt="weather icon"
              className="w-20 my-1 h-20"
            />
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;