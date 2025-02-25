'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie'; // Assuming you're using the react-cookie library for managing cookies

const AuthContext = createContext();

export const UserProvider = ({ children }) => {
    const [cookies] = useCookies(['user']);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const logToken = () => {
            const token = cookies.user;
            console.log('Cookies Changed:', cookies);

            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setUserDetails(decodedToken);
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            } else {
                console.log("No token found");
                setUserDetails(null); // Clear state when no token
            }
        };

        logToken(); // Log token and update state
    }, [cookies.user]); // Dependency on cookies.user changes

    return (
        <AuthContext.Provider value={{ userDetails }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easier access to context
export const useAuth = () => {
    return useContext(AuthContext);
};