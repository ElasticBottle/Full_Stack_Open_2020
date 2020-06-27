import React from 'react'
import Weather from './weather'

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