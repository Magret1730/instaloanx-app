import "./Login.scss";
import {Link} from "react-router-dom";

export default function Login() {
    return (
        <section className="login">
            <section className="login__header">
                <h1 className="login__header-title">LOGIN</h1>
                <p className="login__header-subtitle">Don't have an account?
                    <Link className="login__header-link" to="/login">Register</Link>
                </p>
            </section>

            <section className="login__body">
                <label className="login__body-label">EMAIL
                    <input className="login__body-input" type="email" name="email" id="email" />
                </label>
                <label className="login__body-label">PASSWORD
                    <input className="login__body-input" type="password" name="password" id="password" />
                </label>
            </section>

            <section className="login__button">
                <button className="login__button-button">LOGIN</button>
            </section>
        </section>
    )
}