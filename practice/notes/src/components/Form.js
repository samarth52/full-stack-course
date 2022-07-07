import { useState } from 'react'

const Form = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState('type something here...')

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    setNotes(notes.concat({
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }))
    setNewNote('')
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleClick = (event) => {
    if (newNote === 'type something here...') {
      setNewNote('')
    }
  }

  return (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleChange} onClick={handleClick} />
      <button type="submit">save</button>
    </form>
  )
}

export default Form