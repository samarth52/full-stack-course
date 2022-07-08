import noteService from '../services/notes'
import Note from './Note'

const Display = ({ notes, showAll, setNotes }) => {
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id, note) => {
    const changedNote = {...note, important: !note.important}
    noteService
      .update(changedNote, id)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        console.log(returnedNote, `updated to importance level: ${!note.important}`)
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        noteService
          .getAll()
          .then(storedNotes => setNotes(storedNotes))
      })
  }

  return (
    <ul>
      {notesToShow.map(note =>
        <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id, note)} />
      )}
    </ul>
  )
}

export default Display