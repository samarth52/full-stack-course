import Note from './Note'

const Display = ({ notesToShow }) => {
  return <div>{notesToShow.map(note => 
    <Note key={note.name} name={note.name} phone={note.phone}/>)}
  </div>
}

export default Display