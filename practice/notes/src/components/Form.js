import { useState } from 'react'
import noteService from '../services/notes'

const Form = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState('type something here...')

  const addNote = (event) => {
    event.preventDefault()
    
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        console.log(returnedNote, 'added')
        setNewNote('')
      })
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleChange}/>
      <button type="submit">save</button>
    </form>
  )
}

export default Form