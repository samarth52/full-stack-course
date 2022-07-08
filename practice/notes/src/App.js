import { useEffect, useState } from 'react'
import noteService from './services/notes'

import Form from './components/Form'
import Display from './components/Display'
import ImportantButton from './components/ImportantButton'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled')
        setNotes(initialNotes)
        console.log(`rendered ${initialNotes.length} notes`)
      })
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      <Display notes={notes} showAll={showAll} setNotes={setNotes} />      
      <ImportantButton showAll={showAll} setShowAll={setShowAll} />
      <Form notes={notes} setNotes={setNotes} />
    </div>
  )
}

export default App