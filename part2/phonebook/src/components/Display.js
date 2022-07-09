import Note from './Note'
import phoneService from '../services/phonebook'

const Display = ({ notesToShow, notes, setNotes, setMessageStatusHelper }) => {
  const deleteNote = (note) => () => {
    if (window.confirm(`Delete ${note.name}?`)) {
      setNotes(notes.filter(currNote => currNote.id !== note.id))
      phoneService
        .deleteId(note.id)
        .then(() => {
          setMessageStatusHelper(`id ${note.id} deleted`, true)
          console.log(`deleted id ${note.id} from server`)
        })
        .catch(error => {
          setMessageStatusHelper(`Information of ${note.name} has already been removed from the server`, true)
          console.log('error: record already removed')
        })
    }
  }

  return (
    <div>{notesToShow.map(note => 
      <Note key={note.id} note={note} handleClick={deleteNote(note)}/>)}
    </div>
  )
}

export default Display