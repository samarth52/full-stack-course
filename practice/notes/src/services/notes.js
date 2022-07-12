import axios from 'axios'
const baseURL = '/api/notes'

const getAll = async () => {
  return axios.get(baseURL).then(response => response.data)
}

const create = async (newObject) => {
  return axios.post(baseURL, newObject).then(response => response.data)
}

const update = async (newObject, id) => {
  const request = axios.put(`${baseURL}/${id}`, newObject)
  return request.then(response => response.data)
}

const toExport = {getAll, create, update}

export default toExport