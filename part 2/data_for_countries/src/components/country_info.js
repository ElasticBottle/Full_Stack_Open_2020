import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ location }) => {
    const [weather, setWeather] = useState({})
    useEffect(
        () => {
            const api_key = process.env.REACT_APP_WEATHER_API_KEY
            const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${location}`
            console.log(url);
            axios
                .get(url)
                .then(response => {
                    setWeather(response.data.current)
                    return console.log(response.data.current)
                })
        },
        [location])
    return <div>
        <p><strong>Observed Time:</strong> {weather.observation_time}</p>
        <p><strong>Temperature:</strong> {weather.temperature} degrees celsius</p>
        <img src={weather.weather_icons} alt={`icon for weather in ${location}`} />
        <p><strong>Wind:</strong> {weather.wind_speed} mph, direction {weather.wind_dir}, {weather.wind_degree} degrees</p>
    </div>
}

const CountryInfo = ({ country }) => {
    return <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
            {country.languages.map((language) =>
                <li key={language.name}>{language.name}</li>
            )}
        </ul>
        <img src={country.flag} alt={`flag of ${country.name}`} style={{ width: 400, height: 200, resizeMode: "contain" }} />
        <h2>Weather in {country.capital}</h2>
        <Weather location={country.capital} />
    </div>
}

export default CountryInfo