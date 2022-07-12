import { useState } from 'react'
import phoneService from '../services/phonebook'

const Form = ({ notes, setNotes, setMessageStatusHelper }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleChangeName = (event) => setName(event.target.value)
  const handleChangeNumber = (event) => setNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    let found = false;
    notes.forEach(note => {
      if (name === note.name) {
        if (window.confirm(`${note.name} is already added to phonebook, replace the old number with a new one?`)) {
          const updatedNote = { ...note, number }
          phoneService
            .update(updatedNote)
            .then(() => {
              setNotes(notes.map(currNote => currNote !== note ? currNote : updatedNote))
              console.log(`updated id ${note.id} to`, updatedNote)
              setName('')
              setNumber('')
            })
        }
        found = true;
        return;
      }
    })
    if (!found) {
      const newObj = { name, number, id: notes[notes.length - 1].id + 1 }
      phoneService
        .create(newObj)
        .then(returnedRecord => {
          console.log('added', returnedRecord)
          setNotes(notes.concat(newObj))
          setName('')
          setNumber('')
          setMessageStatusHelper(`Added ${name}`, false)
        })
        .catch(() =>{
          setMessageStatusHelper(`Error adding ${name}`, true)
        }) 
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      name: <input value={name} placeholder='enter a name' onChange={handleChangeName} /><br />
      number: <input value={number} placeholder='enter a number' onChange={handleChangeNumber} /><br />
      <button type="submit">add</button>
    </form>
  )
}

export default Form