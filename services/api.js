import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.1.39:5000' //Development URL
    // baseURL: 'https://8543-186-194-197-54.ngrok-free.app' //Production URL
})

// Basic Services
export const createSession = async (login, senha) => {
    
    return await api.post('/login', {login, senha})
}

export const createClient = async (data) => {
    console.log(data)
    return await api.post('/clientes', {...data})
}