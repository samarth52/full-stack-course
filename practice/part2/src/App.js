import Note from './components/Note'
import {useState} from 'react'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('type something here...')
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

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
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} onClick={handleClick} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App