import "./Header.scss";
import Ellipsis from "../../assets/icons/ellipsis.png";
import EllipsisClose from "../../assets/icons/ecclipsisClose.png";
import Logo from "../../assets/icons/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header({ isHome, isAuthenticated }) {
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

    // function logout clears token and redirects to home page
    return (
        <article className="header">
        {/* <article className={ `header ${isHome ? "" : "header--notHome"}` }> */}
            <section className="header__container">
                <img className="header__logo" src={Logo} alt="logo" onClick={HomeLogoClick} />

                <section className="header__ellipsis"  onClick={handleEllipsisClick}>
                    <img className="header__images" src={ ellipsisCLick ? EllipsisClose : Ellipsis } alt="Ellipsis" />
                </section>
            </section>

            <section className={ ellipsisCLick ? "header__links--display" : "header__links"}>
                <div className="header__link-container">
                    <Link className="header__link" to="#About">ABOUT</Link>
                </div>
                <div className="header__link-container">
                    <Link className="header__link" to="#Contact">CONTACT</Link>
                </div>

                <div className="header__link-container">
                {/* <div className={ isAuthenticated ? "header__link-container--display" : "header__link-container"}> */}
                    <Link className={ !isAuthenticated ? "header__link" : "header__link--display"}  to="/login">LOGIN</Link>
                </div>
                <div className="header__link-container">
                {/* <div className={ isAuthenticated ? "header__link-container--display" : "header__link-container"}> */}
                    {/* <NavLink className="header__link" to="/register">REGISTER</NavLink> */}
                    <Link className={ !isAuthenticated ? "header__link" : "header__link--display"} to="/register">REGISTER</Link>
                </div>

                {/* <div className={ isAuthenticated ? "header__link-container--container" : "header__link-display"}> */}
                <div className="header__link-container">
                    {/* <NavLink className="header__link" to="/logout">LOGOUT</NavLink> */}
                    <Link className={ isAuthenticated ? "header__link" : "header__link--display"} to="/logout">LOGOUT</Link>
                </div>
                <div className="header__link-container ">
                {/* <div className={ isAuthenticated ? "header__link-container--container" : "header__link-display"}> */}
                    {/* <NavLink className="header__link" to="/users">DASHBOARD</NavLink> */}
                    <Link className={ isAuthenticated ? "header__link" : "header__link--display"} to="/users">DASHBOARD</Link>
                </div>

                {/* { isAuthenticated ? (
                    <>
                        <div className="header__link-container">
                            <NavLink className="header__link" to="/login">LOGIN</NavLink>
                        </div>
                        <div className="header__link-container">
                            <NavLink className="header__link" to="/register">REGISTER</NavLink>
                        </div>
                    </>
                    )  :  (
                    <>
                        <div className="header__link-container">
                            <NavLink className="header__link" to="/logout">LOGOUT</NavLink>
                        </div>
                        <div className="header__link-container ">
                            <NavLink className="header__link" to="/users">DASHBOARD</NavLink>
                        </div>

                    </>
                )} */}
            </section>
        </article>
    )
}