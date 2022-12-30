import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return(
      <form>
        <div>find countries<input value = {props.filter} onChange={props.handler}/></div>
      </form>
  )
}

const Countries = ({countries}) => {
  console.log(countries)
  if(countries.length > 10) {
    return(
      <div>Too many matches, specify another filter</div>
    )
  } else if(countries.length === 1) {
    const country = countries[0]
    const languages = Object.values(country.languages)
    return(
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h3>languages:</h3>
        <ul>
          {languages.map(lang =>
            <li key = {lang}>{lang}</li>  
          )}
        </ul>
        <img src={country.flags.png}/>
      </div>
    )
  } else {
     return(
        <div>
        {countries.map(country =>
          <div key = {country.name.common}> {country.name.common}</div>
        )}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredCountries = (newFilter === '')
  ? countries : countries.filter(country => country.name.common.includes(newFilter))

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'notes')

  return(
    <div>
      <Filter filter = {newFilter} handler = {handleFilterChange}/>
      <Countries countries = {filteredCountries} />
    </div>
  )
}

export default App