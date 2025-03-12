import "./Header.scss";
import Ellipsis from "../../assets/icons/ellipsis.png";
import EllipsisClose from "../../assets/icons/ecclipsisClose.png";
import Logo from "../../assets/icons/logo.png";
import { useNavigate, NavLink } from "react-router-dom";

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
                    <NavLink className="header__link" to="/users">ABOUT</NavLink>
                </div>
                <div className="header__link-container">
                    <NavLink className="header__link" to="/admin">CONTACT</NavLink>
                </div>
                <div className="header__link-container">
                    <NavLink className="header__link" to="/usersDetails">LOGIN</NavLink>
                </div>
                <div className="header__link-container">
                    <NavLink className="header__link" to="/register">REGISTER</NavLink>
                </div>
            </section>
        </article>
    )
}