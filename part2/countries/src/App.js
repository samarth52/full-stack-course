import axios from 'axios'
import { useState, useEffect } from 'react'
import Display from './components/Display'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all/')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  console.log(`${countries.length} countries loaded`)

  console.log(countries)
  const reg = new RegExp(filter, 'i')
  const toShow = countries.filter(country => country.name.common.search(reg) !== -1)
  console.log('toShow', toShow)

  return (
    <>
      <div>find countries <input value={filter} onChange={handleChange} /></div>
      <Display toShow={toShow} />
    </>
  )
}

export default App