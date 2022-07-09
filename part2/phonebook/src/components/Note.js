const Note = ({ note, handleClick }) => {
  return (
  <div>
    {note.name} {note.number + ' '}
    <button onClick={handleClick}>delete</button><br />
  </div>
  )
}

export default Note