import { useState } from 'react'

const Form = ({notes, setNotes}) => {
  const [name, setName] = useState('enter a name')
  const [phone, setPhone] = useState('enter a phone')

  const handleChangeName = (event) => setName(event.target.value) 
  const handleChangePhone = (event) => setPhone(event.target.value)

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
      setNotes(notes.concat({name: name, phone: phone}))
      setName('')
      setPhone('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      name: <input value={name} onChange={handleChangeName} /><br/>
      number: <input value={phone} onChange={handleChangePhone} /><br/>
      <button type="submit">add</button>
    </form>
  )
}

export default Form