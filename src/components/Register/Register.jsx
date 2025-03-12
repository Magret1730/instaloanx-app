import "./Register.scss";
import {Link} from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SuccessMessage from "../SuccessMessage/SuccessMessage";

export default function Register() {
    const navigate = useNavigate();

    // sets for form field
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    // sets for errors and messages
    const [ firstNameError, setFirstNameError ] = useState("");
    const [ lastNameError, setLastNameError ] = useState("");
    const [ emailError, setEmailError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Validate firstName
    const isFirstNameValid = (firstName) => {
        const firstNameRegex = /^[a-zA-Z\s\-'.]+$/;

        if (!firstName) {
            setFirstNameError("This field is required");
            return false;
        } else if (!firstNameRegex.test(firstName)) {
            setFirstNameError("Invalid first name. Use only letters, spaces, and these symbols: - . '");
            return false;
        } else {
            setFirstNameError("");
            return true;
        }
    }

    // Validate firstName
    const isLastNameValid = (lastName) => {
        const lastNameRegex = /^[a-zA-Z\s\-'.]+$/;

        if (!lastName) {
            setLastNameError("This field is required");
            return false;
        } else if (!lastNameRegex.test(lastName)) {
            setLastNameError("Invalid last name. Use only letters, spaces, and these symbols: - . '");
            return false;
        } else {
            setLastNameError("");
            return true;
        }
    }

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

        if (!isFirstNameValid(firstName)) {
            return false;
        }

        if (!isLastNameValid(lastName)) {
            return false;
        }

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
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");

            // Clear errors
            setFirstNameError("");
            setLastNameError("");
            setEmailError("");
            setPasswordError("");
    };

    // handles submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isFormValid()) {
                const newUser = {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                };

                const response = await InstaloanxApi.register(newUser);

                if (response.success) {
                    setSuccessMessage("User registered successfully!");
                    resetForm();

                    setTimeout(() => {
                        setSuccessMessage("");
                        navigate("/users");
                    }, 3000);
                } else {
                    if (response.message.includes("User already exist")) {
                        setErrorMessage("Email is already in use. Please use a different email.");
                    } else {
                        setErrorMessage("Registration failed. Please try again.");
                    }
                }
            }
        } catch (error) {
            console.error("Error in register:", error.message);
            // setErrorMessage(error.message);
            setErrorMessage(error.response?.data?.message || "Registration error. Please try again.");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };


    return (
        <form className="register" onSubmit={handleSubmit}>
            <section className="register__header">
                <h1 className="register__header-title">Create New Account</h1>
                <p className="register__header-subtitle">Already Registered?
                    <Link className="register__header-link" to="/login">Login</Link>
                </p>
            </section>

            <section className="register__body">
                <label className="register__body-label"> FIRST NAME
                    <input
                        className={ `register__body-input ${ firstNameError ? "register__body-input--error" : "" }` }
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <ErrorMessage messageError={firstNameError}/>

                <label className="register__body-label">LAST NAME
                    <input
                        className={ `register__body-input ${ lastNameError ? "register__body-input--error" : "" }` }
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <ErrorMessage messageError={lastNameError}/>

                <label className="register__body-label">EMAIL
                    <input
                        className={ `register__body-input ${ emailError ? "register__body-input--error" : "" }` }
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <ErrorMessage messageError={emailError}/>

                <label className="register__body-label">PASSWORD
                    <input
                        className={ `register__body-input ${ passwordError ? "register__body-input--error" : "" }` }
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            </section>
            <ErrorMessage messageError={passwordError}/>

            <section className="register__button">
                <button
                    className="register__button-button"
                    type="submit"
                    onClick={handleSubmit}
                >SIGN UP
                </button>
            </section>
            <SuccessMessage successMessage={successMessage}/>
            <ErrorMessage errorMessage={errorMessage}/>
        </form>
    )
}