import { useState } from 'react'
import DisplayOne from './DisplayOne'

const DisplayMany = ({ countries }) => {
  console.log(`displaying names of ${countries.length} countries`)
  const [display, setDisplay] = useState(Array(countries.length).fill(false));

  const handleClick = (index) => {
    const newDisplay = [...display]
    newDisplay[index] = !display[index]
    return () => setDisplay(newDisplay)
  }

  const trial = (index, country) => display[index] ? <DisplayOne country={country}/> : <></>

  return <div>
    {countries.map((country, index) => {
      return (
        <div key={country.name.official}>
          {country.name.common} <button onClick={handleClick(index)}>{display[index] ? 'hide' : 'show'}</button>
          {trial(index, country)}
        </div>
      )
    })}
  </div>
}

export default DisplayMany