import React, { useState, useEffect } from 'react'
import CountryInfo from './country_info'

const CountryList = ({ countryQuery, countries }) => {

    const [filteredCountries, filterCountry] = useState([])

    useEffect(
        () => {
            const countryFilter = (country) => {
                return country.name.toLowerCase().includes(countryQuery.toLowerCase())
            }
            filterCountry(countries.filter(countryFilter))
        },
        [countries, countryQuery]
    )

    const buttonClicked = (name) => {
        return () => {
            return filterCountry(filteredCountries.filter(
                (country) => country.name.toLowerCase() === name.toLowerCase())
            )
        }
    }

    // console.log(countries);
    console.log(filteredCountries);
    if (countryQuery.length !== 0) {
        if (filteredCountries.length === 0) {
            return <p>No countries matching that filter</p>
        }
        else if (filteredCountries.length === 1) {
            return <CountryInfo country={filteredCountries[0]} />
        } else if (filteredCountries.length <= 10) {
            return filteredCountries.map((country) => {
                return <div key={country.name}>
                    <p>
                        {country.name} <button onClick={buttonClicked(country.name)}>Show</button>
                    </p>
                </div>
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