import "./Register.scss";
import {Link} from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
// import SuccessMessage from "../SuccessMessage/SuccessMessage";
import { toast } from "react-toastify";

export default function Register() {
    const navigate = useNavigate();

    // const id = localStorage.getItem("id");
    // console.log(id);

    // sets for form field
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    // // sets for errors and messages
    // const [ firstNameError, setFirstNameError ] = useState("");
    // const [ lastNameError, setLastNameError ] = useState("");
    // const [ emailError, setEmailError ] = useState("");
    // const [ passwordError, setPasswordError ] = useState("");
    // const [ successMessage, setSuccessMessage ] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");

    // Validate firstName
    const isFirstNameValid = (firstName) => {
        const firstNameRegex = /^[a-zA-Z\s\-'.]+$/;

        if (!firstName) {
            toast.error("First Name is required");
            // setFirstNameError("This field is required");
            return false;
        } else if (!firstNameRegex.test(firstName)) {
            toast.error("Invalid first name. Use only letters, spaces, and these symbols: - . '");
            // setFirstNameError("Invalid first name. Use only letters, spaces, and these symbols: - . '");
            return false;
        } else {
            // setFirstNameError("");
            return true;
        }
    }

    // Validate firstName
    const isLastNameValid = (lastName) => {
        const lastNameRegex = /^[a-zA-Z\s\-'.]+$/;

        if (!lastName) {
            toast.error("Last Name is required");
            // setLastNameError("This field is required");
            return false;
        } else if (!lastNameRegex.test(lastName)) {
            toast.error("Invalid last name. Use only letters, spaces, and these symbols: - . '");
            // setLastNameError("Invalid last name. Use only letters, spaces, and these symbols: - . '");
            return false;
        } else {
            // setLastNameError("");
            return true;
        }
    }

    // Validate email
    const isEmailValid = (Email) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!Email) {
            toast.error("This field is required");
            // setEmailError("This field is required");
            return false;
        } else if (!emailRegex.test(Email)) {
            toast.error("Invalid email address. Please use a valid format, e.g., user@example.com.");
            // setEmailError("Invalid email address. Please use a valid format, e.g., user@example.com.");
            return false;
        } else {
            // setEmailError("");
            return true;
        }
    }

    // Validate email
    const isPasswordValid = (Password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;

        if (!Password) {
            toast.error("Password is required");
            // setPasswordError("This field is required");
            return false;
        } else if (!passwordRegex.test(Password)) {
            toast.error("Password should contain at least one letter and one number, and be at least 4 characters long");
            // setPasswordError("Password should contain at least one letter and one number, and be at least 4 characters long");
            return false;
        } else {
            // setPasswordError("");
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
    // const resetForm = () => {
    //         // Clear all fields in Add mode
    //         setFirstName("");
    //         setLastName("");
    //         setEmail("");
    //         setPassword("");

    //         // Clear errors
    //         setFirstNameError("");
    //         setLastNameError("");
    //         setEmailError("");
    //         setPasswordError("");
    // };

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
                    // setErrorMessage("");
                    toast.success("Registration successful.");
                    // setSuccessMessage("User registered successfully!!!");
                    // resetForm();

                    setTimeout(() => {
                        // setSuccessMessage("");
                        const id = localStorage.getItem("id");
                        // console.log(id);
                        navigate(`/users/${id}`);
                    }, 3000);
                } else {
                    // setSuccessMessage("");
                    if (response.message.includes("User already exist")) {
                        toast.error("Email is already in use. Please use a different email.");
                        // setErrorMessage("Email is already in use. Please use a different email.");
                    } else {
                        toast.error("Registration failed. Please try again.");
                        // setErrorMessage("Registration failed. Please try again.");
                    }
                }
            }
        } catch (error) {
            console.error("Error in register:", error.message);
            toast.error(error.response?.data?.message || "Registration error. Please try again.");
            // setErrorMessage(error.response?.data?.message || "Registration error. Please try again.");
            // setTimeout(() => {
            //     setErrorMessage("");
            // }, 3000);
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
                        className="register__body-input"
                        // className={ `register__body-input ${ firstNameError ? "register__body-input--error" : "" }` }
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            // if (firstNameError && isFirstNameValid(e.target.value)) {
                            //     setFirstNameError(""); // Clears error if firstName is now valid
                            // }
                        }}
                    />
                </label>
                {/* <ErrorMessage messageError={firstNameError}/> */}

                <label className="register__body-label">LAST NAME
                    <input
                        className="register__body-input"
                        // className={ `register__body-input ${ lastNameError ? "register__body-input--error" : "" }` }
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                            // if (lastNameError && isLastNameValid(e.target.value)) {
                            //     setLastNameError(""); // Clears error if lastName is now valid
                            // }
                        }}
                    />
                </label>
                {/* <ErrorMessage messageError={lastNameError}/> */}

                <label className="register__body-label">EMAIL
                    <input
                        // className={ `register__body-input ${ emailError ? "register__body-input--error" : "" }` }
                        className="register__body-input"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            // if (emailError && isEmailValid(e.target.value)) {
                            //     setEmailError(""); // Clears error if email is now valid
                            // }
                        }}
                    />
                </label>
                {/* <ErrorMessage messageError={emailError}/> */}

                <label className="register__body-label">PASSWORD
                    <input
                        // className={ `register__body-input ${ passwordError ? "register__body-input--error" : "" }` }
                        className="register__body-input"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            // if (passwordError && isPasswordValid(e.target.value)) {
                            //     setPasswordError(""); // Clears error if password is now valid
                            // }
                        }}
                    />
                </label>
            </section>
            {/* <ErrorMessage messageError={passwordError}/> */}

            <section className="register__button">
                <button
                    className="register__button-button"
                    type="submit"
                    onClick={handleSubmit}
                >SIGN UP
                </button>
            </section>
            {/* <SuccessMessage successMessage={successMessage}/>
            <ErrorMessage errorMessage={errorMessage}/> */}
        </form>
    )
}