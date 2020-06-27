import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const addNew = (contact) => {
    return axios.post(baseURL, contact)
}

export default { getAll, addNew }