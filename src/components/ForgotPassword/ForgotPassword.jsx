import "./ForgotPassword.scss";
import {Link} from "react-router-dom";

export default function ForgotPassword() {
    return (
        <section className="forgot-password">
            <section className="forgot-password__header">
                <h1 className="forgot-password__header-title">Forgot Password</h1>
                <p className="forgot-password__header-subtitle">
                    Enter your email to reset your password.
                </p>
            </section>

            <section className="forgot-password__body">
                <label className="forgot-password__body-label">
                    EMAIL
                    <input
                        className="forgot-password__body-input"
                        type="email"
                        placeholder="Enter your email"
                    />
                </label>
            </section>

            <section className="forgot-password__button">
                <button className="forgot-password__button-button">RESET PASSWORD</button>
            </section>

            <p className="forgot-password__footer">
                Remember your password? <Link to="/login">Login</Link>
            </p>
        </section>
    )
}
