import Note from './Note'

const Display = ({ notesToShow }) => {
  return <div>{notesToShow.map(note => 
    <Note key={note.name} name={note.name} number={note.number}/>)}
  </div>
}

export default Display