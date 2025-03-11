import "./ForgotPassword.scss";
import {Link} from "react-router-dom";

export default function ForgotPassword() {
    return (
        <section className="register">
            <section className="register__header">
                <h1 className="register__header-title">Create New Account</h1>
                <p className="register__header-subtitle">Already Registered?
                    <Link className="register__header-link" to="/login">Login</Link>
                </p>
            </section>

            <section className="register__body">
                <label className="register__body-label"> FIRST NAME
                    <input className="register__body-input" type="text" name="firstname" id="firstname" />
                </label>
                <label className="register__body-label">LAST NAME
                    <input className="register__body-input" type="text" name="lastname" id="lastname" />
                </label>
                <label className="register__body-label">EMAIL
                    <input className="register__body-input" type="email" name="email" id="email" />
                </label>
                <label className="register__body-label">PASSWORD
                    <input className="register__body-input" type="password" name="password" id="password" />
                </label>
            </section>

            <section className="register__button">
                <button className="register__button-button">SIGN UP</button>
            </section>
        </section>
    )
}
