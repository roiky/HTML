// src/pages/Login.tsx
import React, { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/auth.service";

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(4, "Password is required"),
});

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [serverError, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setServerError(null);

        const parsed = loginSchema.safeParse({ email, password });
        if (!parsed.success) {
            setServerError("Validation failed");
            return;
        }

        try {
            setLoading(true);
            await loginApi(parsed.data);

            navigate("/vacations"); // after login - navigate to vacations page!
        } catch (error) {
            setServerError("Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 420,
                margin: "30px auto",
                padding: 12,
                border: "1px solid black",
                borderRadius: "10px",
            }}
        >
            <h2>Login</h2>

            <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
                <label>
                    Email
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>

                {serverError && <div style={{ color: "red", fontSize: "small", marginBottom: 12 }}>{serverError}</div>}

                <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 20, alignItems: "center" }}>
                    <div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Logging in…" : "Login"}
                        </button>
                    </div>
                    <div>
                        <a style={{ fontSize: "small" }} onClick={() => navigate("/register")}>
                            Don't have an account?
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
}
