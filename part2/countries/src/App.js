import react, { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountries = ({ countriesList, setCurrCountry }) => {

  if (countriesList.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countriesList.length > 1) {
    return (
      <>
        {countriesList.map(country => <CountryOption key={country.name.common} country={country} setCurrCountry={setCurrCountry} />)}
      </>
    )
  } else if (countriesList.length === 1) {
    return <Country country={countriesList[0]} />
  } else {
    return <div>No matches</div>
  }
}

const CountryOption = ({ country, setCurrCountry }) => {
  
  const onShowClick = (country) => {
    setCurrCountry([country])
  }

  return (
    <>
      <div>
        {country.name.common}
        <button onClick={() => onShowClick(country)}>Show</button>
      </div>
      
    </>
  )
}

const DisplayWeather = ({ country, weather }) => {
  if (weather === null) {
    return <div>Loading weather...</div>
  } else {
    return (
      <>
        <h2>Weather in {country.name.common}</h2>
        <div>temperature {weather.main.temp} Celcius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather' />
        <div>wind {weather.wind.speed} m/s</div>
      </>
    )
  }
}

const Country = ({ country }) => {
  console.log(country)

  const [weather, setWeather] = useState(null)

  // Get the weather data for the country
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => setWeather(response.data))
  }, [country])

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <br />
      <b>languages:</b>
      <br />
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.svg} alt='country flag' width='200px' />
      {weather !== null && <DisplayWeather country={country} weather={weather} />}
    </>
  )
}

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [queryStr, setQueryStr] = useState('')
  const [displayList, setDisplayList] = useState([])
  const [currCountry, setCurrCountry] = useState([])

  // Fetch all the countries info and input in allCountries array
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
        setDisplayList(response.data)
      })
  }, [])

  // Update the displayList when the currCountry value changes
  // This will be triggered when 'show' button clicked
  useEffect(() => {
    if (currCountry.length === 1) {
      setDisplayList(currCountry)
    }
  }, [currCountry])

  const onQueryStrChange = (event) => {
    setQueryStr(event.target.value)

    if (event.target.value === '') {
      return setDisplayList(allCountries)
    }

    const filteredArr = allCountries.filter(country => country.name.common.toLowerCase().indexOf(queryStr.toLowerCase()) !== -1)
    setDisplayList(filteredArr)
  }

  return (
    <>
      <form>
        <div>
          find countries
          <input
            value={queryStr}
            onChange={onQueryStrChange}
          />
        </div>
      </form>
      <DisplayCountries countriesList={displayList} setCurrCountry={setCurrCountry} />
    </>
  )
}

export default App
