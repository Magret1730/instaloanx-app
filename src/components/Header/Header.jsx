import "./Header.scss";
import Ellipsis from "../../assets/icons/ellipsis.png";
import EllipsisClose from "../../assets/icons/ecclipsisClose.png";
import Logo from "../../assets/icons/logo.png";

export default function Header({ handleEllipsisClick, ellipsisCLick }) {
    return (
        <article>
            <section className="header">
                <img className="header__logo" src={Logo} alt="logo" />

                <section className="header__ellipsis"  onClick={handleEllipsisClick}>
                    <img className="header__images" src={ ellipsisCLick ? EllipsisClose : Ellipsis } alt="Ellipsis" />
                </section>
            </section>

            <section className={ ellipsisCLick ? "header__links--display" : "header__links"}>
                <div className="header__link-container">
                    <a className="header__link" href="#About">About</a>
                </div>
                <div className="header__link-container">
                    <a className="header__link" href="#Contact">Contact</a>
                </div>
                <div className="header__link-container">
                    <a className="header__link" href="#">Login</a>
                </div>
                <div className="header__link-container">
                    <a className="header__link" href="#">Register</a>
                </div>
            </section>
        </article>
    )
}