const ImportantButton = ({ showAll, setShowAll }) => (
  <button onClick={() => setShowAll(!showAll)}>
    show {showAll ? 'important' : 'all'}
  </button>
)

export default ImportantButton