import DisplayOne from './DisplayOne'
import DisplayMany from './DisplayMany'

const Display = ({ toShow }) => {
  console.log(`filtered to ${toShow.length} countr${toShow.length === 1 ? 'y' : 'ies'}`)
  if (toShow.length === 0) {
    return <div>No matches</div>
  } else if (toShow.length === 1) {
    return <DisplayOne country={toShow[0]}/>
  } else if (toShow.length <= 10) {
    return <DisplayMany countries={toShow} />
  } else {
    return <div>Too many matches, specify another filter</div>
  }
}

export default Display