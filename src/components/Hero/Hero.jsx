import "./Hero.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InstaloanxApi from "../../api/InstaloanxApi";
import Spinner from "../Spinner/Spinner";

export default function Hero({ isAuthenticated }) {
    const [ loading, setLoading ] = useState(true);
    const [ filteredLoans, setFilteredLoans ] = useState(null);

    // Check for isAdmin
    const isAdmin = localStorage.getItem("is_admin");

    // Gets id from localstorage
    const id = localStorage.getItem("id");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Fetches user data based on Id
                const response = await InstaloanxApi.getLoansByUserId(id);

                if (response.success) {
                    // Filters out pending and active loans
                    const filtered = response.data.data.loans.filter(loan => !(loan.status === "Active" || loan.status === "Pending"));
                    setFilteredLoans(filtered);

                     // Find active or pending loan
                    // const active = response.data.data.loans.filter(loan => loan.status === "Active" || loan.status === "Pending");
                    // setActiveLoan(active || null);
                } else {
                    console.error(response.error);
                }
            } catch (err) {
                console.error("Failed to fetch user data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    // Handles loading state
    if (loading) {
        return <Spinner loading={loading} />
    }

    // Handles if isAdmin is flase i.e "0" or the user has an active or pending loan, don't show the button
    console.log(filteredLoans);
    console.log(!filteredLoans);
    console.log(!filteredLoans === 0);
    console.log(isAdmin);
    console.log(typeof(isAdmin));
    const shouldShowButton = isAdmin === "0" && (!filteredLoans || filteredLoans.length === 0);
    console.log(shouldShowButton);

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