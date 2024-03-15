import React, { createContext, useEffect, useState } from "react";

import { createSession } from "../services/api";
import { api } from "../services/api";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        const loadData = async () => {
            const user = await AsyncStorage.getItem('user')
            const token = await AsyncStorage.getItem('token')

            // console.log(user, token)
            if(user && token){
                setUser(JSON.parse(user))
                api.defaults.headers.Authorization = `Bearer ${token}`
            }
        }

        loadData()

    }, [])

    const login = async (data) => {
        const response = await createSession(data.username, data.senha)
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user))
        await AsyncStorage.setItem('token', response.data.token)

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`
        setUser(response.data.user)
    }

    const logout = async () => {
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('token')

        api.defaults.headers.Authorization = null

        setUser(null)
    }

    return(
        <AuthContext.Provider value={{authenticated: (user ? true : false), user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}