import React, {useEffect, useState} from 'react'
import "./WeatherComponent.css";
import { getWeatherByPosition, getWeatherByCityName } from '../api/api';
import WeatherCard from '../WeatherCard/WeatherCard';
import { v4 as uuidv4 } from 'uuid';


const WeatherComponent = ({ selectedCity }) => {
  const [ weather, setWeather] = useState(null);
  const [ weatherArr, setWeatherArr] = useState([]);
  const [ latitude, setLatitude ] = useState(null);
  const [ longitude, setLongitude ] = useState(null);
 
  useEffect(() => {
      const getWeatherData = async() => {
      navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      }) 

      if(!weather && latitude && longitude) {
        const dataFromServer = await getWeatherByPosition(latitude, longitude, 'metric');
        let weatherData = {
          id: uuidv4(),
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
        console.log('Weather data: ', weatherData )
        setWeather(weatherData);
        setWeatherArr([weatherData])
      }
    }
    getWeatherData();
        
  });

  useEffect(() => {
    
    if(selectedCity) {
    const getWeatherByName = async() => {
      const weatherFromServer = await getWeatherByCityName(selectedCity, 'metric')
      let weatherData = {
        id: uuidv4(),
        cityName: weatherFromServer.name,
        counrty: weatherFromServer.sys["country"],
        desciption: weatherFromServer.weather[0].main,
        icon: weatherFromServer.weather[0].icon,
        temperature: weatherFromServer.main.temp,
        humidity: weatherFromServer.main.humidity,
        pressure: weatherFromServer.main.pressure, 
        feels_like: weatherFromServer.main.feels_like,
        wind: weatherFromServer.wind.speed
      }
      const newArr = weatherArr.concat(weatherData)
      setWeatherArr(newArr)
      
    }

    getWeatherByName();
  }

  }, [selectedCity])

  const filterInput = (id) => {
    const weatherSet = weatherArr.filter(city => city.id !== id);

    setWeatherArr(weatherSet)
  }

  return (
    <div className="container">
      <WeatherCard weatherArr={[...weatherArr]} removeCityCard={filterInput}/>
    </div>
  )
}

export default WeatherComponent
