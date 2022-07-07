import Weather from './Weather'

const DisplayOne = ({ country, isSingle }) => {
  console.log(`displaying details of ${country.name.common}`)

  const displayWeather = () => {
    if (isSingle) {
      return <Weather capital={country.capital[0]} latlng={country.latlng} isSingle={isSingle} />
    } else {
      return <></>
    }
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital[0]} <br />
      area {country.area}
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} /> <br />
      {displayWeather()}
    </div>
  )
}

export default DisplayOne