import "./ForgotPassword.scss";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { toast} from "react-toastify";
import InstaloanxApi from "../../api/InstaloanxApi";

export default function ForgotPassword() {
    // sets for email form field
    const [ email, setEmail ] = useState("");

    const navigate = useNavigate();

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

    // Function vaidates the form
    const isFormValid = () => {
        if (!isEmailValid(email)) {
            return false;
        }

        return true;
    }

    // handles submit form
    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            if (isFormValid()) {

            const response = await InstaloanxApi.forgotPassword(email);

            if (response.success === false) {
                toast.error(response.error || response.message || "Error sending password reset link. Please try again.");
            }

            if (response.data.status === 200) {
                toast.success("Password reset link sent to your email. Please login with the new password.");

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } 
            }
        } catch (error) {
            console.error("Error in forgot Password:", error.response?.data?.message);
            toast.error(error.response.data);
            toast.error(error.response?.data?.message || "Forgot Password error. Please try again.");
        }
    }


    return (
        <form className="forgot-password" onSubmit={handleSubmit}>
            <section className="forgot-password__header">
                <h1 className="forgot-password__header-title">Forgot Password</h1>
                <p className="forgot-password__header-subtitle">
                    Enter your email to reset your password.
                </p>
            </section>

            <section className="forgot-password__body">
                <label className="forgot-password__body-label">
                    Email
                    <input
                        className="forgot-password__body-input"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </label>
            </section>

            <section className="forgot-password__button">
                <button className="forgot-password__button-button">RESET PASSWORD</button>
            </section>

            <p className="forgot-password__footer">
                Remember your password? <Link className="forgot-password__login" to="/login">Login</Link>
            </p>
        </form>
    )
}
