const BASE_API = "https://api.openweathermap.org/data/2.5/weather?q=";
const GEO_URL = "https://api.openweathermap.org/data/2.5/weather?"
const CITY_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?"
const API_KEY = "5aa8d9cb8c37eae7ad7b278a3ffe8f33"

export const getWeatherByCityName = async(city, units) => {
  const weather = await fetch(`${BASE_API}${city}&&units=${units}&appid=${API_KEY}`)
  const responceFromServer = await weather.json();

  return responceFromServer.data || responceFromServer;
}

export const getWeatherByPosition = async(lat, long, units) => {
  const weather = await fetch(`${GEO_URL}lat=${lat}&lon=${long}&exclude=hourly&&units=${units}&appid=${API_KEY}`)
  const responceFromServer = await weather.json();

  console.log('Responce: ', responceFromServer["name"])
  return responceFromServer.data || responceFromServer;
}

export const getRegionByCoordiats = async(lat, long) => {
  const city = await fetch(`${CITY_URL}?latitude=${lat}&longitude=${long}&localityLanguage=ru`)
  const cityFromServer = await city.json();

  return cityFromServer.data || cityFromServer;
}
