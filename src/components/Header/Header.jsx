import "./Header.scss";
import Ellipsis from "../../assets/icons/ellipsis.png";
import EllipsisClose from "../../assets/icons/ecclipsisClose.png";
import Logo from "../../assets/icons/logo.png";
import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header({ isHome }) {
    const [ ellipsisCLick, setEllipsisClick ] = useState(false);

    const handleEllipsisClick = () => {
        setEllipsisClick(!ellipsisCLick);
    }

    const navigate = useNavigate();

    function HomeLogoClick() {
        navigate("/");
    }

    // Detect viewport changes and reset ellipsisCLick state
    useEffect(() => {
        const handleResize = () => {
            // Check if the viewport width is greater than or equal to tablet size
            if (window.matchMedia("(min-width: 768px)").matches) {
                setEllipsisClick(false); // Reset ellipsisCLick state
            }
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // I need a dashboard navlink for when users are authenticated
    // authenticated, LOGOUT("/logout") and DASHBOARD("/users")
    // not authenticated, LOGIN and REGISTER
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
                    <NavLink className="header__link" to="#About">ABOUT</NavLink>
                </div>
                <div className="header__link-container">
                    <NavLink className="header__link" to="#Contact">CONTACT</NavLink>
                </div>

                {/* { !isAuthenticated ? */}
                    {/* <> */}
                        <div className="header__link-container">
                            <NavLink className="header__link" to="/login">LOGIN</NavLink>
                        </div>
                        <div className="header__link-container">
                            <NavLink className="header__link" to="/register">REGISTER</NavLink>
                        </div>
                    {/* </> */}
                        {/* : */}
                    {/* <> */}
                        <div className="header__link-container header__link-container--display">
                            <NavLink className="header__link" to="/login">LOGOUT</NavLink>
                        </div>
                        <div className="header__link-container ">
                            <NavLink className="header__link" to="/users">DASHBOARD</NavLink>
                        </div>

                    {/* </> */}
                {/* } */}
            </section>
        </article>
    )
}