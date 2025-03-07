import "./Footer.scss";
import LinkedInIcon from "../../assets/icons/linkedin.png";
import TwitterIcon from "../../assets/icons/twitter.png";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">

                {/* Social Media Icons */}
                <div className="footer__social">
                    <a
                        href="https://www.linkedin.com/in/oyedele-abiodun/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer__social-link"
                    >
                        <img className="footer__social-image" src={LinkedInIcon} alt="LinkedIn" />
                    </a>
                    <a
                        href="https://x.com/OyedeleMagret"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer__social-link"
                    >
                        <img className="footer__social-image" src={TwitterIcon} alt="Twitter" />
                    </a>
                </div>

                {/* Copyright Notice */}
                <p className="footer__text">
                    &copy; {new Date().getFullYear()} InstaloanX. All rights reserved.
                </p>
            </div>
        </footer>
    );
}