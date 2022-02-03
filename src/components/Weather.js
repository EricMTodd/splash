import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = () => {
  const [celsius, setCelsius] = useState(0)
  const [fahrenheit, setFahrenheit] = useState(0)
  const [icon, setIcon] = useState('')
  const cities = [
    'Tokyo',
    'London',
    'New York',
    'Dublin',
    'Beijing',
    'Moscow',
    'Los Angeles',
    'Denver',
    'Salt Lake City',
    'Atlanta',
    'Washington D.C.',
    'Berlin',
    'Edinburgh',
    'New Delhi',
    'Mumbai',
    'Baghdad',
    'Johannesburg',
    'Mexico City',
    'Sao Paulo',
    'Guadalahara',
    'Lima',
    'Bangkok',
    'Hong Kong',
    'Paris',
    'Vienna',
    'Reykjavik',
    'Oslo',
    'Bern',
    'Brussels',
    'Rome',
    'Toronto',
    'Anchorage',
    'Phoenix',
    'Las Vegas',
    'Canberra',
    'Sydney',
    'Ontario'
  ]
  const [city, setCity] = useState(cities[Math.floor(Math.random() * cities.length)])
  const [country, setCountry] = useState('')
  const apiKey = '8d9b598296f463cb05d7baea7c741c65'

  const getRandomCity = () => {
    let newCity = cities[Math.floor(Math.random() * cities.length)]
    setCity(newCity)

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}`)
    .then(response => {
      setCountry(response.data.sys.country)
      setCelsius(Math.floor(response.data.main.feels_like - 273.15))
      setFahrenheit(Math.floor((response.data.main.feels_like - 273.15) * 9 / 5 + 32))
      setIcon(response.data.weather[0].icon)
    })
    .catch(error => console.log(error))
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`)
      .then(response => {
        setCountry(response.data.sys.country)
        setCelsius(Math.floor(response.data.main.feels_like - 273.15))
        setFahrenheit(Math.floor((response.data.main.feels_like - 273.15) * 9 / 5 + 32))
        setIcon(response.data.weather[0].icon)
        setCity(response.data.name)
      })
      .catch(error => console.log(error))
    });
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      getLocation()
      let timer = setInterval(() => {
        getLocation()
      }, 900000)
    }

    getRandomCity()
    let timer = setInterval(() => {
      getRandomCity()
    }, 900000)
    return () => clearInterval(timer)
  }, [])


  if (country === 'US') {
    return(
      <div id='weather'>
        <h1>{city}</h1>
        <h1>{fahrenheit}° F</h1>
        <img src={`http://openweathermap.org/img/wn/${icon}.png`}/>
      </div>
    )
  }

  return(
    <div id='weather'>
      <h1>{city}</h1>
      <h1>{celsius}° C</h1>
      <img src={`http://openweathermap.org/img/wn/${icon}.png`}/>
    </div>
  )
}

export default Weather