import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return(
      <form>
        <div>find countries<input value = {props.filter} onChange={props.handler}/></div>
      </form>
  )
}

const Weather = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const lat = country.latlng[0]
  const lon = country.latlng[1]
  const [temp, setTemp] = useState(0) 
  const [wind, setWind] = useState(0)
  const [iconId, setIconId] = useState('01d')

  const promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
  promise.then(response => {
    const weather = response.data
    console.log(weather)
    setTemp((weather.main.temp-273.15).toFixed(2))
    setWind(weather.wind.speed)
    setIconId(weather.weather[0].icon)
    }) 
    
  const icon = `http://openweathermap.org/img/wn/${iconId}@2x.png`
  return(
    <div>
      <div>temperature {temp} Celsius</div>
      <img src={icon} alt={icon}/>
      <div>wind {wind} m/s</div>
    </div>
  )  
}

const Country = ({country}) => {
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
      <img src={country.flags.png} alt={country.flag}/>
      <h2>Weather in {country.name.common}</h2>
      <Weather country = {country}/>
    </div>
  )
}

const Countries = ({countries, setCountries}) => {
  console.log(countries)
  if(countries.length > 10) {
    return(
      <div>Too many matches, specify another filter</div>
    )
  } else if(countries.length === 1) {
    return(
      <Country country = {countries[0]} />
    )
  } else {
     return(
        <div>
        {countries.map(country =>
          <div key = {country.name.common}>
            {country.name.common}
            <button onClick={()=>setCountries([country])}>show</button>
          </div>
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
      <Countries countries = {filteredCountries} setCountries = {setCountries}/>
    </div>
  )
}

export default App