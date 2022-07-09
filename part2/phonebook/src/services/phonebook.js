import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = async (newObject) => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = async (newObject) => {
  return axios.put(`${baseUrl}/${newObject.id}`, newObject).then(response => response.data)
}

const deleteId = async (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const toExport = {getAll, create, update, deleteId}

export default toExport