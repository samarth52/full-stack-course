import { useState } from 'react'
import Form from './components/Form'
import Display from './components/Display'

const App = () => {
  const [notes, setNotes] = useState([])
  const [filter, setFilter] = useState('')

  const handleChangeFilter = (event) => setFilter(event.target.value)
  const reg = new RegExp(filter)
  const notesToShow = notes.filter(note => note.name.search(reg) !== -1)

  return (
    <>
      <h1>Phonebook</h1>
      <p>filter shown with <input value={filter} onChange={handleChangeFilter}/></p>
      <h1>add a name</h1>
      <Form notes={notes} setNotes={setNotes}/>
      <h1>Numbers</h1>
      <Display notesToShow={notesToShow} />
    </>
  )
}

export default App;
