import React, { createContext, useState } from "react";

import { createSession } from "../services/api";
import { api } from "../services/api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})

    const login = async (data) => {
        const response = await createSession(data.username, data.senha)
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`
        setUser(response.data.user)
    }

    const logout = async () => {
        api.defaults.headers.Authorization = null
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{authenticated: (user ? true : false), user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}