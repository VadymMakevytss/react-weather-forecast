import React, {useEffect, useState} from 'react'
import "./WeatherComponent.css";
import ForecastleChart from '../ForecastleChart/ForecastleChart';
import { getWeatherByCityName, getWeatherByPosition } from '../api/api';


const WeatherComponent = () => {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState(null)
 
  useEffect(() => {
    const getWeatherData = async() => {
      
      navigator.geolocation.getCurrentPosition(showPosition);

      if(!weather && city) {
        const dataFromServer = await getWeatherByCityName(city, 'metric');

        console.log('Data from server: ', dataFromServer)

          let weatherData = {
          cityName: dataFromServer.name,
          counrty: dataFromServer.sys.country,
          desciption: dataFromServer["weather"][0].main,
          icon: dataFromServer["weather"][0].icon,
          temperature: dataFromServer.main.temp,
          humidity: dataFromServer.main.humidity,
          pressure: dataFromServer.main.pressure, 
          feels_like: dataFromServer.main.feels_like,
          wind: dataFromServer.wind.speed
        }
        localStorage.setItem('city', JSON.stringify(weatherData))

        setWeather(weatherData);
      }
      console.log('City: ', city)
    }
    
    getWeatherData();
  }, [city]);

  const showPosition = async(position) => {
    const cityName = await getWeatherByPosition(position.coords.latitude, position.coords.longitude, 'metric');
    setCity(cityName.name);
  }
 
  return (
    <div className="container">
      <div className="forecast-card">
        <div className="forecast__close">
            <button className="forecast__close-button" type="button">
                X
            </button>
        </div>
        <div className="forecat__header">
          <div className="forecast__left">
            <div className="forecast__city">
              {weather && `${weather.cityName}, ${weather.counrty}`}
            </div>
            <div className="forecast__data">
              {`${new Date()
                .toLocaleString('en-us', {  weekday: 'short' })} , ${new Date()
                .getDay()} ${new Date()
                .toLocaleString('default', { month: 'long' })} , ${new Date()
                .getHours()}:${new Date().getMinutes()}`
              }
            </div>
          </div>
          <div className="forecast__right">
          <div className="forecast__description">
            {weather && <img style={{width: "50px", marginRight:"10px"}} src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="icon"></img>}
            {weather && `${weather.desciption}`}
            </div>
          </div>
        </div>
        <div className="forecast__body">
          {weather && <ForecastleChart weather={weather} />}
        </div>
        <div className="forecast__foter">
          <div className="forecat__foter-left">
            <div className="forecast__temperature">
              {weather && `${weather.temperature}`}
            </div>
            <div className="forecast__fill">
              {weather && `Feels like: ${weather.feels_like}`}
            </div>
          </div>
          <div className="forecast__footer-right">
            <div className="forecast__wind">
              {weather && `Wind: ${weather.wind} m/s`}
            </div>
            <div className="forecast__humidity">
              {weather && `Humidity: ${weather.humidity}%`}
            </div>
            <div className="forecast__pressure">
              {weather && `Pressure: ${weather.pressure}Pa`}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WeatherComponent
