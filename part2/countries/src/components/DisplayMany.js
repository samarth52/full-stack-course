const DisplayMany = ({ countries }) => {
  console.log(`displaying names of ${countries.length} countries`)
  return <div>
    {countries.map(country => <div key={country.name.official}>{country.name.common}</div>)}
  </div>
}

export default DisplayMany