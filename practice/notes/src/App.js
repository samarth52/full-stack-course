import axios from 'axios'
import { useEffect, useState } from 'react'

import Form from './components/Form'
import Display from './components/Display'
import ShowImportant from './components/ShowImportant'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log(`render ${notes.length} notes`)

  return (
    <div>
      <h1>Notes</h1>
      <Display notes={notes} showAll={showAll} />      
      <ShowImportant showAll={showAll} setShowAll={setShowAll} />
      <Form notes={notes} setNotes={setNotes} />
    </div>
  )
}

export default App