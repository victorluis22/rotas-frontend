import axios from "axios";

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_ROTAS_API_URL
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

// Specialized Services

export const getClientContracts = async (table, id) => {
    return await api.get(`/${table}/${id}`)
}

export const getHorarioContrato = async (table, id) => {
    return await api.get(`/${table}/${id}`)
}

export const getHorarioVeiculo = async (table, id) => {
    return await api.get(`/${table}/${id}`)
}

export const getRespVeiculo = async (table, id) => {
    return await api.get(`/${table}/${id}`)
}

export const getHorarioPonto = async (table, id) => {
    return await api.get(`/${table}/${id}`)
}

export const getHorariosComplete = async () => {
    return await api.get(`/horarios/all`)
}

export const getClientQRCode = async (id) => {
    return await api.get(`/clientes/qrcode/${id}`)
}

export const getXLSXContent = async (empresaId) => {
    return await api.get(`/clientes/xlsx/${empresaId}`)
}

export const getLatestWeeklyRoute = async () => {
    return await api.get(`/json/buscar?type=weekly`)
}

export const getLatestAllRoute = async () => {
    return await api.get(`/json/buscar?type=all`)
}

export const postConsolidatedData = async (data) => {
    return await api.post(`/coleta/consolidated`, {...data})
}

export const postDetailedData = async (data) => {
    return await api.post(`/coleta/detailed`, {...data})
}


