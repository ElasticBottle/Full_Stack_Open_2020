import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const addNew = (contact) => {
    return axios.post(baseURL, contact)
}

const removeExisting = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

export default { getAll, addNew, removeExisting }