import "./ResetPassword.scss";
// import { Link } from "react-router-dom";

export default function ResetPassword() {
    return (
        <section className="reset-password">
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
                    />
                </label>
                <label className="reset-password__body-label">
                    Confirm Password
                    <input
                        className="reset-password__body-input"
                        type="password"
                        placeholder="Confirm your new password"
                    />
                </label>
            </section>

            <section className="reset-password__button">
                <button className="reset-password__button-button">RESET PASSWORD</button>
            </section>
        </section>
    );
}