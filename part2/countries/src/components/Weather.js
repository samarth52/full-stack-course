//import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(url)
      const data = await result.json()
      setWeather(data)
    }
    fetchData()
  }, [url])
  return weather
}

const Weather = ({ capital, latlng }) => {
  const weather = useFetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&exclude=hourly,daily&appid=${process.env.REACT_APP_API_KEY}`)
  console.log(weather)

  return (!weather ? 'loading...' :
    <div>
      <h3>Weather in {capital}</h3>
      temperature {weather.current.temp} Celcius <br />
      <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt="weather icon"/> <br />
      wind {weather.current.wind_speed} m/s
    </div>
  )
}

export default Weather