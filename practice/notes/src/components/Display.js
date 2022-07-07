import Note from './Note'

const Display = ({ notes, showAll }) => {
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <ul>
      {notesToShow.map(note =>
        <Note key={note.id} note={note} />
      )}
    </ul>
  )
}

export default Display