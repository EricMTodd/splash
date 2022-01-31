import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = () => {
  const [celsius, setCelsius] = useState(0)
  const [fahrenheit, setFahrenheit] = useState(0)
  const [kelvin, setKelvin] = useState(0)
  const [icon, setIcon] = useState('')
  const apiKey = '8d9b598296f463cb05d7baea7c741c65'
  const city = 'Denver'

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => {
      console.log(response.data)
      setKelvin(response.data.main.feels_like)
      setCelsius(Math.floor(response.data.main.feels_like - 273.15))
      setFahrenheit(Math.floor((response.data.main.feels_like - 273.15) * 9 / 5 + 32))
      setIcon(response.data.weather[0].icon)
    })
    .catch(error => console.log(error))
  }, [])

  return(
    <div id='weather'>
      <h1>{fahrenheit}° F</h1>
      <img src={`http://openweathermap.org/img/wn/${icon}.png`}/>
    </div>
  )
}

export default Weather