import React from 'react'

const CountryQuery = ({ countryQuery, setCountryQuery }) => {
    const countryQueryChange = event => {
        setCountryQuery(event.target.value)
    }

    return <div>
        find countries <input value={countryQuery} onChange={countryQueryChange} />
    </div>
}

export default CountryQuery