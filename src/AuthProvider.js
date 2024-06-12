import React, { useState} from "react";
import {AuthContext} from "./AuthContext";


export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('access_token');
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    const login = (token) => {
        localStorage.setItem('access_token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
