import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CountryList from './components/country_list'
import CountryQuery from './components/country_query'


function App() {
  const [countries, setCountries] = useState([])
  const [countryQuery, setCountryQuery] = useState('')

  const getCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(getCountries, [])

  return (
    <div className="App">
      <CountryQuery countryQuery={countryQuery} setCountryQuery={setCountryQuery} />
      <CountryList countryQuery={countryQuery} countries={countries} />
    </div>
  );
}

export default App;
