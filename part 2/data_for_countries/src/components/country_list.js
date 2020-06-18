import React from 'react'
import CountryInfo from './country_info'

const CountryList = ({ countryQuery, countries }) => {
    const countryFilter = (country) => {
        return country.name.toLowerCase().includes(countryQuery.toLowerCase())
    }
    const filteredCountries = countries.filter(countryFilter)

    console.log(filteredCountries);
    if (countryQuery.length !== 0) {
        if (filteredCountries.length === 0) {
            return <p>No countries matching that filter</p>
        }
        else if (filteredCountries.length === 1) {
            return <CountryInfo country={filteredCountries[0]} />
        } else if (filteredCountries.length <= 10) {
            return filteredCountries.map((country) => {
                return <p key={country.name}>{country.name}</p>
            })

        } else {
            return <p>Too many matches, specify another filter</p>
        }
    }
    else {
        return <></>
    }
}

export default CountryList