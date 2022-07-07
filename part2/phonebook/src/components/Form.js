import { useState } from 'react'

const Form = ({notes, setNotes}) => {
  const [name, setName] = useState('enter a name')
  const [number, setNumber] = useState('enter a number')

  const handleChangeName = (event) => setName(event.target.value) 
  const handleChangeNumber = (event) => setNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    let found = false;
    notes.forEach(note => {
      if (name === note.name) {
        alert(`${name} is already added to phonebook`)
        found = true;
        return;
      }
    })
    if (!found) {
      setNotes(notes.concat({name: name, number: number}))
      setName('')
      setNumber('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      name: <input value={name} onChange={handleChangeName} /><br/>
      number: <input value={number} onChange={handleChangeNumber} /><br/>
      <button type="submit">add</button>
    </form>
  )
}

export default Form