import "./Hero.scss";

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
                    <button className="hero__button">Apply loan</button>
                </div>
            </section>
        </section>
    )
}