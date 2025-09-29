import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../services/api";

type User = {
    userId: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
} | null;

type AuthContextValue = {
    user: User;
    loading: boolean; // טעינת פרטי המשתמש בהתחלה
    loginFromToken: () => Promise<void>; // טוען user מה-token הנשמר
    logout: () => void;
    setUserDirectly: (u: User) => void; // אופציונלי: לעדכן ידנית
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    // פונקציה שמבצעת בקשה לשרת /auth/me כדי לקבל את ה־user
    async function loginFromToken() {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        // עדכן header כדי ש־api ישלח אותו (אם לא עשית זאת כבר)
        setAuthToken(token);

        try {
            const res = await api.get("/auth/me");
            setUser(res.data.user ?? null);
        } catch (err) {
            // אם הטוקן לא תקין - ננקה
            setUser(null);
            setAuthToken(null);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // בהעלאת ה־app נטען את הפרטי משתמש מתוך הטוקן
        loginFromToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function logout() {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem("token");
        // ניתן גם לנווט ל /login מבחוץ
    }

    return (
        <AuthContext.Provider value={{ user, loading, loginFromToken, logout, setUserDirectly: setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
