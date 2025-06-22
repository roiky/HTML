import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

type UserPayload = {
    userName: string | undefined;
    password: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
};
const URL = "http://localhost:5000";
export default function RegisterPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const usernameREF = useRef<HTMLInputElement>(null);
    const passwordREF = useRef<HTMLInputElement>(null);
    const firstnameREF = useRef<HTMLInputElement>(null);
    const lastnameREF = useRef<HTMLInputElement>(null);

    const checkAndSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!usernameREF?.current?.value || !passwordREF?.current?.value) {
            return;
        } else {
            registerUserApi({
                userName: usernameREF.current?.value,
                password: passwordREF.current?.value,
                firstName: firstnameREF.current?.value,
                lastName: lastnameREF.current?.value,
            });
            console.log(
                `User Registered: [${usernameREF?.current?.value}, ${passwordREF?.current?.value}, ${firstnameREF?.current?.value}, ${lastnameREF?.current?.value}]`
            );
            navigate("/login");
        }
    };
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
    if (isLoading) return <h1>Loading....</h1>;
    return (
        <div>
            <h2>Signup Form</h2>

            <form onSubmit={checkAndSubmit}>
                <div>
                    <label>Username*:</label>
                    <input type="text" name="username" placeholder="Username" ref={usernameREF} />
                </div>
                <div>
                    <label>Password*:</label>
                    <input type="text" name="password" placeholder="Password" ref={passwordREF} />
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstname" placeholder="First Name" ref={firstnameREF} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastname" placeholder="Last Name" ref={lastnameREF} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
