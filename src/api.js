import axios from 'axios'

const api = axios.create({
    baseURL: 'https://obscure-bayou-76349.herokuapp.com/'
})

export default api
