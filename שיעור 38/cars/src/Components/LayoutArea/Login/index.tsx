import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserPayload = {
    userName: string | undefined;
    password: string | undefined;
};
const URL = "http://localhost:5000";
export default function LoginPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const usernameREF = useRef<HTMLInputElement>(null);
    const passwordREF = useRef<HTMLInputElement>(null);

    async function loginUserApi(userPayload: UserPayload) {
        try {
            setIsLoading(true);
            const response = await axios.post(`${URL}/login`, userPayload);
            if (response.status === 200) {
                navigate("/home");
            }
        } catch (error) {
            alert("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1> Login Page </h1>
            <h2> Please login to your application using the credentials.</h2>

            <div>
                <label>Username:</label>
                <input type="text" name="username" placeholder="Username" ref={usernameREF} />
            </div>
            <div>
                <label>Password:</label>
                <input type="text" name="password" placeholder="Password" ref={passwordREF} />
            </div>

            <button
                onClick={() => {
                    loginUserApi({
                        userName: usernameREF.current?.value,
                        password: passwordREF.current?.value,
                    });
                }}
            >
                Log in
            </button>

            <button
                onClick={() => {
                    navigate("/register");
                }}
            >
                Click to register
            </button>
        </div>
    );
}
