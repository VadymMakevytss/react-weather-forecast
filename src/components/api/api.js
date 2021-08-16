const BASE_API = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "5aa8d9cb8c37eae7ad7b278a3ffe8f33"

export const getWeather = async(city) => {
  const weather = await fetch(`${BASE_API}${city}&appid=${API_KEY}`)
  const responceFromServer = await weather.json();

  return responceFromServer.data || responceFromServer;
}
