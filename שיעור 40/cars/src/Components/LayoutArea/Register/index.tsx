import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserPayload = {
    userName: string | undefined;
    password: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
};

// useRef
// direct full access to DOM
// save value between renders ?
const URL = "http://localhost:2200";
export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNamedRef = useRef<HTMLInputElement>(null);

    async function registerUserApi(userPayload: UserPayload) {
        try {
            setIsLoading(true);
            const response = await axios.post(`${URL}/register`, userPayload);
            if (response.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            alert("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }

    const registerActionCB = useCallback(() => {
        registerUserApi({
            userName: userNameRef.current?.value,
            password: passwordRef.current?.value,
            firstName: firstNameRef.current?.value,
            lastName: lastNamedRef.current?.value,
        });
    }, []);

    if (isLoading) return <h1>Loading....</h1>;
    return (
        <div>
            <h1> Register Page </h1>
            <form action="">
                <input type="text" placeholder="userName" ref={userNameRef} />
                <input type="text" placeholder="password" ref={passwordRef} />
                <input type="text" placeholder="firstname" ref={firstNameRef} />
                <input type="text" placeholder="lastName" ref={lastNamedRef} />
                <button type="button" onClick={registerActionCB}>
                    Register
                </button>
            </form>
        </div>
    );
}
