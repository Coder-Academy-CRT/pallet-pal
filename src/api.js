// Un-comment after deploy to netlify

import axios from 'axios'

const api = axios.create({
    // baseURL: import.meta.env.VITE_API_URL
    baseURL: "https://obscure-bayou-76349.herokuapp.com/"
})

export default api