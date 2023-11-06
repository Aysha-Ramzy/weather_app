import { DateTime } from "luxon";
import c from '../Images/cl.png'
import clearSky from '../Images/clearSky.png'
import fewClouds from '../Images/cl.png'
import rain from '../Images/icons8-rain-96.png'
import thunder from '../Images/icons8-thunder-96.png'
import smoke from '../Images/icons8-smoke-96.png'
import snow from '../Images/icons8-snow-64.png'
import clouds from '../Images/icons8-clouds-64.png'



const API_KEY = "21e8ebe3f84095d24c84cd438834d992";
const BASE = "https://api.openweathermap.org/data/2.5";


const getWeatherData = (infoType,searchParams) => {
    const url = new URL(BASE + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, APPID:API_KEY});

    return fetch(url).then((res) => res.json());
};




const formatCurrentWeather = (data) => {
    const {
            coord:{lon,lat},
            main:{temp,temp_min,temp_max,feels_like,humidity,pressure},
            name,
            dt,
            sys:{country,sunrise,sunset},
            weather,
            wind:{speed}
    } = data

    const {main : details,icon} = weather[0]

    return {lat,lon,temp,temp_min,temp_max,feels_like,humidity,pressure,name,dt,country,sunrise,sunset,details,icon,speed};

}

// const formatForecastWeather = (data) => {
//     let { timezone, daily, hourly} = data;
//     // daily = daily.slice(1, 5).map((d) => {
//     //     return {
//     //         title : formatToLocalTime(d.dt, timezone, "ccc"),
//     //         temp : d.temp.day,
//     //         icon : d.weather[0].icon
//     //     }
//     // });

//     // hourly = hourly.slice(1, 4).map((d) => {
//     //     return {
//     //         title : formatToLocalTime(d.dt,timezone,'hh:mm a'),
//     //         temp : d.temp.day,
//     //         icon : d.weather[0].icon
//     //     }
//     // });

//     return { timezone,daily,hourly };
// };
const formatForecastWeather = (data) => {
    let { timezone, list } = data;
    const dailyForecast = {};

    list.forEach((forecastData) => {
        const { dt, main, weather } = forecastData;
        const { temp } = main;
        const { icon } = weather[0];

        const localTime = formatToLocalTime(dt, timezone, 'ccc');

        if (!dailyForecast[localTime]) {
            dailyForecast[localTime] = {
                title: localTime,
                temp: temp,
                icon: icon,
            };
        }
    });

    // Convert the dailyForecast object into an array of results
    const dailyForecastArray = Object.values(dailyForecast);

    return { timezone, daily: dailyForecastArray };
};




const getFormatedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams).then(formatCurrentWeather);

    const {lat,lon} = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("forecast",
    {   lat,
        lon,
        // exclude:'current,minutely,alerts',
        units: searchParams.units, })
        .then(formatForecastWeather);

    return { ...formattedCurrentWeather, ...formattedForecastWeather};
}




const formatToLocalTime =
 (secs, zone, format = "cccc,dd LLL yyyy' | Local time : 'hh:mm a"
 ) => DateTime.fromSeconds(secs).
setZone(zone).toFormat(format);

// const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}.png`;

function iconUrlFromCode(code) {
    const iconMappings = {
      '01d': clearSky, 
      '01n': clearSky, 
      '04n': clouds,
      '02n': c, 
      '02d': c, 
      '03d': c, 
      '03n': c, 
      '10n' : rain,
      '11n' : thunder,
      '11d' : thunder,
      '50n' : smoke,
      '13n' : snow,
      '50n' : smoke
    };
  
    // Check if there's a mapping for the provided code, otherwise use a default icon code
    return iconMappings[code] || c;
  }


export default getFormatedWeatherData;

export { formatToLocalTime,iconUrlFromCode};