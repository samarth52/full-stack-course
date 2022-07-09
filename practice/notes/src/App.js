import { useEffect, useState } from 'react'
import noteService from './services/notes'

import Form from './components/Form'
import Display from './components/Display'
import ImportantButton from './components/ImportantButton'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
        console.log(`rendered ${initialNotes.length} notes`)
      })
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <Display notes={notes} showAll={showAll} setNotes={setNotes} setErrorMessage={setErrorMessage} />      
      <ImportantButton showAll={showAll} setShowAll={setShowAll} />
      <Form notes={notes} setNotes={setNotes} />
    </div>
  )
}

export default App