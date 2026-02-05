// app/context/UserContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            setUser(null);
            return;
        }

        try {
            setLoading(true);
            const currentUser = await getCurrentUser(token);
            // Pastikan backend mengembalikan { name, avatar, email }
            // Jika backend mengembalikan { user: { ... } }, gunakan currentUser.user
            setUser(currentUser.user || currentUser);
        } catch (err) {
            setUser(null);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);