import React from "react";
import {
  UilArrowUp,
  UilArrowDown,
  UilWind,
  UilSun,
  UilCloud,
  UilCloudSun,
  UilCloudRain,
  UilTemperature,
  UilSunset,
  UilTear,
} from "@iconscout/react-unicons";
import { useNavigate } from 'react-router-dom';
import { formatToLocalTime, iconUrlFromCode } from "./Services/WeatherService";

function FullForecast({ items,weather : {dt,details,icon,temp,temp_min,temp_max,sunrise,sunset,speed,humidity,feels_like,timezone,name,country }}) {
  console.log(items);
  const navigate = useNavigate();

  return (
    <div>
          <div className='bg-gradient-to-rb from-cyan-100 max-w-screen-md mx-auto to-white  h-screen  m-o p-6 items-center'>
        <div className="flex flex-row items-center justify-between text-black py-3 mt-20">
        <img
          src={iconUrlFromCode(icon)}
          alt="weather icon"
          className="w-32 h-30"
        />

        <p className="text-6xl font-bold"> {`${temp.toFixed()}°`}</p>

        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Feels like :<span className="font-medium ml-1"> {`${feels_like.toFixed()}°`} </span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity :<span className="font-medium ml-1"> {`${humidity.toFixed()}%`} </span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind :<span className="font-medium ml-1"> {`${speed.toFixed()}km/h`} </span>
          </div>
        </div>
      </div>



     <div>
        <div className=' flex items-center justify-center my-3'>
            <p className='text-black text-2xl font-medium'>
                {`${name}`}
            </p>
            <p className='text-black text-2xl font-medium'>
                ,{`${country}`}
            </p>

        </div>
    </div>
      
    <div className= 'flex flex-col mx-auto max-w-screen-md bg-gradient-to-br py-5 px-32 h-fit shadow-xl border rounded-3xl my-6'>  

      <div className="flex items-center justify-center mt-7">
        <p className="text-black text-lg font-medium">Weekly Forecast</p>
      </div>
      <hr className="my-8" />

      <div className="flex flex-row items-center justify-between text-black">
        {items.map((item) => (
          <div className="flex flex-col items-center justify-center" key={item.title}>
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
    <p 
        onClick={() => navigate('/')}
        className="flex  justify-center mt-14 font-medium transition ease-in-out hover:scale-90 cursor-pointer"> Back To Home </p>

    </div>
    </div>
  );
}

export default FullForecast;
