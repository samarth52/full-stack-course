import { useState, useEffect } from 'react'
import phoneService from './services/phonebook'

import Form from './components/Form'
import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
  const [notes, setNotes] = useState([])
  const [filter, setFilter] = useState('')

  const reg = new RegExp(filter)
  const notesToShow = notes.filter(note => note.name.search(reg) !== -1)
  useEffect(() => {
    phoneService
      .getAll()
      .then(initalRecords => {
        setNotes(initalRecords)
        console.log(`rendered ${initalRecords.length} records`)
      })
  }, [])

  return (
    <>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <h1>add a name</h1>
      <Form notes={notes} setNotes={setNotes}/>
      <h1>Numbers</h1>
      <Display notesToShow={notesToShow} notes={notes} setNotes={setNotes} />
    </>
  )
}

export default App;
