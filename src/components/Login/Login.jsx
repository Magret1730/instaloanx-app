import "./Login.scss";
import {Link} from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
    const navigate = useNavigate();

    // sets for form field
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    // Validate email
    const isEmailValid = (Email) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!Email) {
            toast.error("Email is required");
            return false;
        } else if (!emailRegex.test(Email)) {
            toast.error("Invalid email address. Please use a valid format, e.g., user@example.com.");
            return false;
        } else {
            return true;
        }
    }

    // Validate email
    const isPasswordValid = (Password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;

        if (!Password) {
            toast.error("Password is required");
            return false;
        } else if (!passwordRegex.test(Password)) {
            toast.error("Password should contain at least one letter and one number, and be at least 4 characters long");
            return false;
        } else {
            return true;
        }
    }

    // Function vaidates the form
    const isFormValid = () => {
        if (!isEmailValid(email)) {
            return false;
        }

        if (!isPasswordValid(password)) {
            return false;
        }

        return true;
    }

    // handles submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isFormValid()) {
                const newUser = { email: email, password: password };

                const response = await InstaloanxApi.login(newUser);
                // console.log(response);

                // const data = response.data.data;

                if (response.success) {
                    toast.success("User login successfully!");

                    // Timeout function navigates based on is_admin
                    setTimeout(() => {
                        // navigate(data.is_admin ? `/admin/${data.id}` : `/users/${data.id}`);
                        navigate(response.data.data.is_admin ? "/admin" : "/dashboard");
                    }, 2000);
                } else {
                    // if (response.message.includes("Invalid email or password")) {
                    //     toast.error("Invalid email or password.");
                    // } else {
                    //     toast.error("Login failed. Please try again.");
                    // }
                    toast.error(response.message || "Login error. Please try again");
                }
            }
        } catch (error) {
            console.log(error);
            console.error("Error in login:", error.response?.data?.message);
            toast.error(error.response.data);
            toast.error(error.response?.data?.message || "Login error. Please try again.");
        }
    };


    return (
        <form className="login" onSubmit={handleSubmit}>
            <section className="login__header">
                <h1 className="login__header-title">LOGIN</h1>
                <p className="login__header-subtitle">Don't have an account?
                    <Link className="login__header-link" to="/register">Register</Link>
                </p>
            </section>

            <section className="login__body">
                <label className="login__body-label">EMAIL
                    <input
                        className="login__body-input"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </label>

                <label className="login__body-label">PASSWORD
                    <input
                        className="login__body-input"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </label>
            </section>

            <section className="login__button">
                <button
                    className="login__button-button"
                    type="submit"
                    onClick={handleSubmit}
                >LOGIN</button>
            </section>
        </form>
    )
}