import axios from "axios"
const API_URL = 'https://659b97b5d565feee2dab46a7.mockapi.io'


const AxiosService = axios.create({
    baseURL: API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})

export default AxiosService