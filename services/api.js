import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.1.39:5000' //Development URL
    // baseURL: 'https://8543-186-194-197-54.ngrok-free.app' //Production URL
})

// Basic Services
export const createSession = async (login, senha) => {
    return await api.post('/login', {login, senha})
}

export const get = async (table) => {
    return await api.get(`/${table}`)
}

export const create = async (table, data) => {
    console.log(data)
    return await api.post(`/${table}`, {...data})
}

export const update = async (table, id, data) => {
    console.log(id, data)
    return await api.put(`/${table}/${id}`, {...data})
}

export const remove = async (table, id) => {
    return await api.delete(`/${table}/${id}`)
}

export const getClientContracts = async (table, id) => {
    return await api.get(`/${table}/${id}`)
}

export const getHorarioContrato = async (table, id) => {
    return await api.get(`/${table}/${id}`)
}

export const getHorarioPonto = async (table, id) => {
    return await api.get(`/${table}/${id}`)
}

export const getHorariosComplete = async () => {
    return await api.get(`/horarios/all`)
}


