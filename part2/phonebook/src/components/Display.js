import Note from './Note'
import phoneService from '../services/phonebook'

const Display = ({ notesToShow, notes, setNotes }) => {
  const deleteNote = (note) => () => {
    if (window.confirm(`Delete ${note.name}?`)) {
      setNotes(notes.filter(currNote => currNote.id !== note.id))
      phoneService.deleteId(note.id)
      console.log(`deleted id ${note.id} from server`)
    }
  }

  return (
    <div>{notesToShow.map(note => 
      <Note key={note.id} note={note} handleClick={deleteNote(note)}/>)}
    </div>
  )
}

export default Display