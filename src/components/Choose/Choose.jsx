import "./Choose.scss";
import ChooseImage from "../../assets/images/money2.jpg";

export default function Choose() {
    return (
        <article className="choose">
            <section className="choose__box choose__box-width">
                <p className="choose__box-title">Why Choose Us</p>
                <p className="choose__box-subtitle">Your trusted partner for personalized loan solutions, expert financial guidance</p>
                <img className="choose__box-image" src={ChooseImage} alt="choose section image" />
            </section>

            <section className="choose__box choose__box-container">
                <div className="choose__box-content">
                    <p className="choose__box-number">50+</p>
                    <p className="choose__box-text">Years of Experience</p>
                </div>
                <div className="choose__box-content">
                    <p className="choose__box-number">20k</p>
                    <p className="choose__box-text">Loans Approved</p>
                </div>
                <div className="choose__box-content">
                    <p className="choose__box-number">15k</p>
                    <p className="choose__box-text">Satisfied Clients</p>
                </div>
            </section>
        </article>
    )
}