"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SafeUserData } from "@/lib/userServices";

interface UserContextType {
    user: SafeUserData | null;
    setUser: (user: SafeUserData | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const STORAGE_KEY = "jojodle_user";

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<SafeUserData | null>(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setUserState(JSON.parse(stored));
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    function setUser(user: SafeUserData | null) {
        setUserState(user);
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    function logout() {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used inside a <UserProvider>");
    return context;
}