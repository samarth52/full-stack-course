import { useState } from 'react'
import Form from './components/Form'
import Display from './components/Display'
import Filter from './components/Filter'

const App = () => {
  const [notes, setNotes] = useState([])
  const [filter, setFilter] = useState('')

  const notesToShow = notes.filter(note => note.name.search(new RegExp(filter)) !== -1)

  return (
    <>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <h1>add a name</h1>
      <Form notes={notes} setNotes={setNotes}/>
      <h1>Numbers</h1>
      <Display notesToShow={notesToShow} />
    </>
  )
}

export default App;
