import "./Header.scss";
import Ellipsis from "../../assets/icons/ellipsis.png";
import EllipsisClose from "../../assets/icons/ecclipsisClose.png";
import Logo from "../../assets/icons/logo.png";
import { useNavigate } from "react-router-dom";

export default function Header({ handleEllipsisClick, ellipsisCLick, isHome }) {
    const navigate = useNavigate();

    function HomeLogoClick() {
        navigate("/");
    }

    return (
        <article className={ `header ${isHome ? "" : "header--notHome"}` }>
            <section className="header__container">
                <img className="header__logo" src={Logo} alt="logo" onClick={HomeLogoClick} />

                <section className="header__ellipsis"  onClick={handleEllipsisClick}>
                    <img className="header__images" src={ ellipsisCLick ? EllipsisClose : Ellipsis } alt="Ellipsis" />
                </section>
            </section>

            <section className={ ellipsisCLick ? "header__links--display" : "header__links"}>
                <div className="header__link-container">
                    <a className="header__link" href="/register">About</a>
                </div>
                <div className="header__link-container">
                    <a className="header__link" href="/login">Contact</a>
                </div>
                <div className="header__link-container">
                    <a className="header__link" href="/users">Login</a>
                </div>
                <div className="header__link-container">
                    <a className="header__link" href="/admin">Register</a>
                </div>
            </section>
        </article>
    )
}