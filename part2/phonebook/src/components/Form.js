import { useState } from 'react'
import phoneService from '../services/phonebook'

const Form = ({notes, setNotes}) => {
  const [name, setName] = useState('enter a name')
  const [number, setNumber] = useState('enter a number')

  const handleChangeName = (event) => setName(event.target.value) 
  const handleChangeNumber = (event) => setNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    let found = false;
    notes.forEach(note => {
      if (name === note.name) {
        if (window.confirm(`${note.name} is already added to phonebook, replace the old number with a new one?`)) {
          const updatedNote = {...note, number}
          setNotes(notes.map(currNote => currNote !== note ? currNote : updatedNote))
          phoneService.update(updatedNote)
          console.log(`updated id ${note.id} to`, updatedNote)
          setName('')
          setNumber('')
        }
        found = true;
        return;
      }
    })
    if (!found) {
      const newObj = {name, number, id: notes[notes.length - 1].id + 1}
      setNotes(notes.concat(newObj))
      setName('')
      setNumber('')
      phoneService
        .create(newObj)
        .then(returnedRecord => console.log('added', returnedRecord))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      name: <input value={name} onChange={handleChangeName} /><br/>
      number: <input value={number} onChange={handleChangeNumber} /><br/>
      <button type="submit">add</button>
    </form>
  )
}

export default Form