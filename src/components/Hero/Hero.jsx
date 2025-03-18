import "./Hero.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InstaloanxApi from "../../api/InstaloanxApi";

export default function Hero({ isAuthenticated }) {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ filteredLoans, setFilteredLoans ] = useState(null);

    // Check for isAdmin
    const isAdmin = localStorage.getItem("is_admin");
    // console.log(isAdmin);

    const id = localStorage.getItem("id");
    // console.log(id);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Fetches user data based on Id
                const response = await InstaloanxApi.getLoansByUserId(id);
                // console.log(response);

                if (response.success) {
                    // Filters out pending and active loans
                    const filtered = response.data.data.loans.filter(loan => !(loan.status === "Active" || loan.status === "Pending"));
                    // console.log(filteredLoans);
                    setFilteredLoans(filtered);
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError("Failed to fetch user data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    // Handles if isAdmin is "1" or the user has an active or pending loan, don't show the button
    const shouldShowButton = isAdmin === "0" && filteredLoans && filteredLoans.length > 0;
    // console.log(shouldShowButton);

    return (
        <section className="hero">
            <section className="hero__container">
                <div className="hero__box">
                    <p className="hero__texts">Loan Application Denied?</p>
                    <p className="hero__texts">Try with Us</p>
                </div>

                <div className="hero__boxe">
                    <p className="hero__text">You are one step away from accessing that loan you need</p>
                    { shouldShowButton && (
                        <Link to={isAuthenticated() ? "/loanForm" : "/login"}><button className="hero__button">Apply loan</button></Link>
                    )}
                </div>
            </section>
        </section>
    )
}