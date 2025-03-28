import "./Header.scss";
import Ellipsis from "../../assets/icons/ellipsis.png";
import EllipsisClose from "../../assets/icons/ecclipsisClose.png";
import Logo from "../../assets/icons/logo.png";
import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

export default function Header() {

    const [ ellipsisCLick, setEllipsisClick ] = useState(false);
    const [ dashboardLink, setDashboardLink ] = useState("");

    const navigate = useNavigate();

    const handleEllipsisClick = () => {
        setEllipsisClick(!ellipsisCLick);
    }

    function HomeLogoClick() {
        navigate("/");
    }

    // Function authenticates users
    // useCallback hook is used to memorize isAuth, ensuring that it
    // doesn't change unless localStorage itself changes.
    const isAuth = useCallback(() => {
        return !!localStorage.getItem("token");
    }, []);

    // Detect viewport changes and reset ellipsisClick state
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

    useEffect(() => {
            const fetchUserRole = async () => {
            try {
                const isAdmin = localStorage.getItem("is_admin");

                if (isAdmin === "1") {
                    // setDashboardLink(`/admin/${id}`);
                    setDashboardLink("/admin");
                } else if (isAdmin === "0") {
                    // setDashboardLink(`/users/${id}`);
                    setDashboardLink("/dashboard");
                }
            } catch (err) {
                console.error("Invalid token:", err);
            }
        };

        if (isAuth()) {
            fetchUserRole();
        }
    }, [isAuth]);

    return (
        <article className="header">
            <section className="header__container">
                <div className="header__logo-title">
                    <img className="header__logo" src={Logo} alt="logo" onClick={HomeLogoClick} />
                    <p className="header__title" onClick={HomeLogoClick}>InstaloanX</p>
                </div>

                <section className="header__ellipsis"  onClick={handleEllipsisClick}>
                    <img className="header__images" src={ ellipsisCLick ? EllipsisClose : Ellipsis } alt="Ellipsis" />
                </section>
            </section>

            <section className={ ellipsisCLick ? "header__links--display" : "header__links"}>
                <NavLink className="header__link" to="/">HOME</NavLink>
                <NavLink className="header__link" to="/help">HELP</NavLink>

                {isAuth() ? (
                    <>
                        <NavLink className="header__link" to="/logout">LOGOUT</NavLink>
                        <NavLink className="header__link" to={dashboardLink}>DASHBOARD</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink className="header__link" to="/login">LOGIN</NavLink>
                        <NavLink className="header__link" to="/register">REGISTER</NavLink>
                    </>
                )}
            </section>
        </article>
    )
}