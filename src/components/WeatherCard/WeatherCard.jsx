import React, { useState, useEffect} from 'react';
import './WeatherCard.css';
import ForecastleChart from '../ForecastleChart/ForecastleChart';

const WeatherCard = ({weatherArr, removeCityCard}) => {
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    setWeatherData([...weatherArr])
  }, [weatherArr])

  const handleClick = (event) => {
    deleteCard(event.target.value);
    removeCityCard(event.target.value);
  }

  const deleteCard = (id) => {
    const weatherSet = weatherData.filter(city => city.id !== id);

    setWeatherData(weatherSet);
  }

  return(
    <div className="forecast">
      {[...weatherData].map(item => (
       <div
        key={item.key}
        className="forecast-card"
      >
       <div className="forecast__close">
           <button 
            className="forecast__close-button" 
            type="button"
            value={item.id}
            onClick={handleClick}
           >
               X
           </button>
       </div>
       <div className="forecat__header">
         <div className="forecast__left">
           <div className="forecast__city">
             {item && `${item.cityName}, ${item.counrty}`}
           </div>
           <div className="forecast__data">
             {`${new Date().toLocaleString('en-us', {  weekday: 'short' })} , 
               ${new Date().getDay()} 
               ${new Date().toLocaleString('default', { month: 'long' })} , 
               ${new Date().getHours()}:${new Date().getMinutes()}`
             }
           </div>
         </div>
         <div className="forecast__right">
         <div className="forecast__description">
           {item && <img style={{width: "50px", marginRight:"10px"}} src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="icon"></img>}
           {item && `${item.desciption}`}
           </div>
         </div>
       </div>
       <div className="forecast__body">
         {item && <ForecastleChart weather={item} />}
       </div>
       <div className="forecast__foter">
         <div className="forecat__foter-left">
           <div className="forecast__temperature">
             {item && `${item.temperature}`}
           </div>
           <div className="forecast__fill">
             {item && `Feels like: ${item.feels_like}`}
           </div>
         </div>
         <div className="forecast__footer-right">
           <div className="forecast__wind">
             {item && `Wind: ${item.wind} m/s`}
           </div>
           <div className="forecast__humidity">
             {item && `Humidity: ${item.humidity}%`}
           </div>
           <div className="forecast__pressure">
             {item && `Pressure: ${item.pressure}Pa`}
           </div>
         </div>
       </div>
     </div>
      ))}
    </div>
  )
}

export default WeatherCard
