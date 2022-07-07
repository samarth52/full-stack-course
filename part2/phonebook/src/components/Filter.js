const Filter = ({ filter, setFilter }) => {
  const handleChangeFilter = (event) => setFilter(event.target.value)
  return <p>filter shown with <input value={filter} onChange={handleChangeFilter}/></p>
}

export default Filter