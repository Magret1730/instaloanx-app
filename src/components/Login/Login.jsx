import "./Login.scss";
import {Link} from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SuccessMessage from "../SuccessMessage/SuccessMessage";

export default function Login() {
    const navigate = useNavigate();

    // sets for form field
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    // sets for errors and messages
    const [ emailError, setEmailError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Validate email
    const isEmailValid = (Email) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!Email) {
            setEmailError("This field is required");
            return false;
        } else if (!emailRegex.test(Email)) {
            setEmailError("Invalid email address. Please use a valid format, e.g., user@example.com.");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    }

    // Validate email
    const isPasswordValid = (Password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;

        if (!Password) {
            setPasswordError("This field is required");
            return false;
        } else if (!passwordRegex.test(Password)) {
            setPasswordError("Password should contain at least one letter and one number, and be at least 4 characters long");
            return false;
        } else {
            setPasswordError("");
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

    // Reset form fields
    const resetForm = () => {
            // Clear all fields in Add mode
            setEmail("");
            setPassword("");

            // Clear errors
            setEmailError("");
            setPasswordError("");
    };


    // Checks if user is already logged in
    useEffect(() => {
        const existingUserToken = localStorage.getItem("token");
        if (existingUserToken) {
            setSuccessMessage("You are already logged in!");
            setTimeout(() => {
                navigate("/users");
            }, 3000);
        }
    }, [navigate]);

    // handles submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isFormValid()) {
                const newUser = { email: email, password: password };

                const response = await InstaloanxApi.login(newUser);

                if (response.success) {
                    setErrorMessage("");
                    setSuccessMessage("User login successfully!");
                    resetForm();

                    // Fetches user role after login
                    const isAdminLogin = await InstaloanxApi.getUserIdFromToken();
                    // setIsAdminState(!!isAdminLogin.is_admin); //converts to boolean

                    // Timeout function navigates based on is_admin
                    setTimeout(() => {
                        navigate(isAdminLogin.is_admin ? "/admin" : "/users");
                    }, 2000);
                } else {
                    setSuccessMessage("");
                    if (response.message.includes("Invalid email or password")) {
                        setErrorMessage("Invalid email or password.");
                    } else {
                        setErrorMessage("Login failed. Please try again.");
                    }
                }
            }
        } catch (error) {
            console.error("Error in login:", error.message);
            setErrorMessage(error.response?.data?.message || "Login error. Please try again.");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };


    return (
        <form className="login" onSubmit={handleSubmit}>
            <section className="login__header">
                <h1 className="login__header-title">LOGIN</h1>
                <p className="login__header-subtitle">Don't have an account?
                    <Link className="login__header-link" to="/login">Register</Link>
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
                            if (emailError && isEmailValid(e.target.value)) {
                                setEmailError(""); // Clears error if email is now valid
                            }
                        }}
                    />
                </label>
                <ErrorMessage messageError={emailError}/>

                <label className="login__body-label">PASSWORD
                    <input
                        className="login__body-input"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (passwordError && isPasswordValid(e.target.value)) {
                                setPasswordError(""); // Clears error if password is now valid
                            }
                        }}
                    />
                </label>
                <ErrorMessage messageError={passwordError}/>
            </section>

            <section className="login__button">
                <button
                    className="login__button-button"
                    type="submit"
                    onClick={handleSubmit}
                >LOGIN</button>
            </section>
            <SuccessMessage successMessage={successMessage}/>
            <ErrorMessage errorMessage={errorMessage}/>
        </form>
    )
}