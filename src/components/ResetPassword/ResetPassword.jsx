import { useParams } from "react-router-dom";
import "./ResetPassword.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const { token } = useParams();

    const navigate = useNavigate();

    // sets for email form field
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    // Validate email
    const isPasswordValid = (newPassword, confirmPassword) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;

        if (!newPassword || !confirmPassword) {
            toast.error("All fields are required");
            return false;
        } else if (!passwordRegex.test(newPassword)) {
            toast.error("Password should contain at least one letter and one number, and be at least 4 characters long");
            return false;
        } else if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        } else {
            return true;
        }
    }

    // Function vaidates the form
    const isFormValid = () => {
        if (!isPasswordValid(newPassword, confirmPassword)) {
            return false;
        }

        return true;
    }

    // handles submit form
    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            if (isFormValid()) {

            const response = await InstaloanxApi.resetPassword(newPassword, confirmPassword, token);

                if (response.data.status === 200) {
                    toast.success("Password changed successfully, please login with the new password.");

                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                } else {
                    toast.error(response.error || response.message || "Error changing password. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error in reset Password:", error.response?.data?.message);
            toast.error(error.response.data);
            toast.error(error.response?.data?.message || "Reset Password error. Please try again.");
        }
    }

    return (
        <form className="reset-password" onSubmit={handleSubmit}>
            <section className="reset-password__header">
                <h1 className="reset-password__header-title">Reset Password</h1>
                <p className="reset-password__header-subtitle">
                    Enter your new password.
                </p>
            </section>

            <section className="reset-password__body">
                <label className="reset-password__body-label">
                    New Password
                    <input
                        className="reset-password__body-input"
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </label>
                <label className="reset-password__body-label">
                    Confirm Password
                    <input
                        className="reset-password__body-input"
                        type="password"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
            </section>

            <section className="reset-password__button">
                <button className="reset-password__button-button">RESET PASSWORD</button>
            </section>
        </form>
    );
}