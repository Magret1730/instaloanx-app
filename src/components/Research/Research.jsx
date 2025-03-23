import "./Research.scss";
import Person1 from "../../assets/icons/person1.png"
import Home from "../../assets/icons/home.png"
import Business from "../../assets/icons/business.png"
import Education from "../../assets/icons/education.png"
import Car from "../../assets/icons/car.png"
import Security from "../../assets/icons/security.png"

export default function Research() {
    return (
        <article className="research">
            <section className="research__header">
                <p className="research__header-title">Recent Search and Popular Product</p>
                <p className="research__header-subtitle">Get the Right Financial Product to Start Your Success Journey</p>
            </section>

            <section className="research__container">
                <section className="research__box-contents research__box-border">
                    <section className="research__box research__box-space">
                        <img className="research__box-icon" src={Person1} alt="Person Icon" />
                        <div className="research__box-content">
                            <p className="research__box-header">Personal Loan</p>
                            <p className="research__box-text">Our personal loan offers flexible terms and competitive rates, tailored to meet your individual needs.</p>
                        </div>
                    </section>
                    <section className="research__box">
                        <img className="research__box-icon" src={Home} alt="Person Icon" />
                        <div className="research__box-content">
                            <p className="research__box-header">Home Loan</p>
                            <p className="research__box-text">Our home loan offers flexible terms and competitive rates, tailored to meet your individual needs.</p>
                        </div>
                    </section>
                    <section className="research__box">
                        <img className="research__box-icon" src={Business} alt="Person Icon" />
                        <div className="research__box-content">
                            <p className="research__box-header">Business Loan</p>
                            <p className="research__box-text">Our business loan offers flexible terms and competitive rates, tailored to meet your individual needs.</p>
                        </div>
                    </section>
                </section>

                <section className="research__box-contents">
                    <section className="research__box research__box-spaced">
                        <img className="research__box-icon" src={Education} alt="Person Icon" />
                        <div className="research__box-content">
                            <p className="research__box-header">Education Loan</p>
                            <p className="research__box-text">Our education loan offers flexible terms and competitive rates, tailored to meet your individual needs.</p>
                        </div>
                    </section>
                    <section className="research__box">
                        <img className="research__box-icon" src={Car} alt="Person Icon" />
                        <div className="research__box-content">
                            <p className="research__box-header">Car Loan</p>
                            <p className="research__box-text">Our car loan offers flexible terms and competitive rates, tailored to meet your individual needs.</p>
                        </div>
                    </section>
                    <section className="research__box">
                        <img className="research__box-icon" src={Security} alt="Person Icon" />
                        <div className="research__box-content">
                            <p className="research__box-header">Loan Against Security</p>
                            <p className="research__box-text">Our loan against security offers flexible terms and competitive rates, tailored to meet your individual needs.</p>
                        </div>
                    </section>
                </section>
            </section>
        </article>
    )
}