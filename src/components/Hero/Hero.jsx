import "./Hero.scss";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="hero">
            <section className="hero__container">
                <div className="hero__box">
                    <p className="hero__texts">Loan Application Denied?</p>
                    <p className="hero__texts">Try with Us</p>
                </div>

                <div className="hero__boxe">
                    <p className="hero__text">You are one step away from accessing that loan you need</p>
                    <Link to="/loanForm"><button className="hero__button">Apply loan</button></Link>
                </div>
            </section>
        </section>
    )
}