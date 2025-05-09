import "./Users.scss";
import UsersHistory from "../UsersHistory/UsersHistory";
import { Link, useNavigate, useParams } from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

// Fetch singer user, fetch loan history
export default function Users({isAuthenticated}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [activeLoan, setActiveLoan] = useState(null);
    const [loansData, setLoansData] = useState(null);
    const [filteredLoans, setFilteredLoans] = useState(null);

    const navigate = useNavigate();
    const id = localStorage.getItem("id");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await InstaloanxApi.getLoansByUserId(id);

                if (response.success) {
                    setUser(response.data.data.user);
                    setLoansData(response.data.data.loans);

                    // Find active or pending loan
                    const active = response.data.data.loans.filter(loan => loan.status === "Active" || loan.status === "Pending");
                    setActiveLoan(active || null);

                    // Filter out pending and active loans
                    const filtered = response.data.data.loans
                        .filter(loan => !(loan.status === "Active" || loan.status === "Pending"))
                        .sort((a, b) => new Date( b.updated_at) - new Date(a.updated_at));
                    setFilteredLoans(filtered);

                } else {
                    console.error(response.message);
                }
            } catch (err) {
                console.error("Failed to fetch user data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    // Takes care of loading
    if (loading) {
        return <Spinner loading={loading} />
    }

    // Gets token
    const token = localStorage.getItem("token");

    if (!token) {
        return "Not authenticated"
    }

    return (
        <article className="users__box">
            <section className="users__box-header">
                <section className="users__header">
                    <p className="users__header-header">Hi {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)},</p>
                    <div className="users__header-links">
                        {/* condition rendering of apply button based on active or pending loan */}
                        { activeLoan.length === 0 && (
                            <Link to={isAuthenticated ? "/loanForm" : "/login"}><button className="users__header-button">APPLY LOAN</button></Link>
                        )}

                        <Link to={isAuthenticated ? "/repayLoan" : "/login"}><button className="users__header-button">PAY LOAN</button></Link> {/*protect this route in app.js*/}
                    </div>
                </section>

                {/* active loan section */}
                <section className="users__active">
                    <p className="users__active-title">CURRENT LOAN</p>

                    {/* Map through active loans */}
                    {activeLoan.length > 0 ? (
                        activeLoan.map((loan) => (
                            <div key={loan.id}>
                                <section className="users__active-head">
                                    <p className="users__active-headd">Loan</p>    
                                    <p className="users__active-headd">Balance</p>    
                                    <p className="users__active-headd">Borrowed</p>
                                    <p className="users__active-headd">Paid</p>   
                                    <p className="users__active-headd">Status</p>    
                                </section> 

                                <section className="users__active-container">
                                    <div className="users__active-box">
                                        <p className="users__active-header">Loan</p>
                                        <p className="users__active-text">${loan.loan_amount}</p> 
                                    </div>
                                    <div className="users__active-box">
                                        <p className="users__active-header">Balance</p>
                                        <p className="users__active-text">${loan.remaining_balance}</p>   

                                    </div> 
                                    <div className="users__active-box">
                                        <p className="users__active-header">Borrowed</p>
                                        <p className="users__active-text">
                                            {new Date(loan.created_at).toLocaleDateString()}
                                        </p>   
                                    </div> 
                                    <div className="users__active-box">
                                        <p className="users__active-header">Paid</p>
                                        <p className="users__active-text">
                                            {new Date(loan.updated_at).toLocaleDateString()}
                                        </p>   
                                    </div> 
                                    <div className="users__active-box">
                                        <p className="users__active-header">Status</p>
                                        <p className="users__active-text">{loan.status}</p>   
                                    </div>    
                                </section>
                            </div>
                        ))
                    ) : (
                        <section className="users__active-no-loan">
                        <p className="users__active-no-loan-text">You have no active or pending loan.</p>
                        <button className="users__active-no-loan-button" onClick={() => navigate("/loanForm")}>
                            Apply for a Loan
                        </button>
        </section>
    )}
                </section>
            </section> 

            {/* users history */}
            <section className="users__history">
                <h3 className="users__history-title">LOAN HISTORY</h3>

                {/* Loan History Section */}
                {filteredLoans.length > 0 ? (
                    <>
                        {/* Render the table header */}
                        <section className="users__history-head">
                            <p className="users__history-head-text">NUM</p>
                            <p className="users__history-head-text">LOAN</p>
                            <p className="users__history-head-text">BORROWED</p>
                            <p className="users__history-head-text">PAID</p>
                            <p className="users__history-head-text">STATUS</p>
                        </section>

                        {/* Map through loans and render each loan */}
                        {filteredLoans.map((singleLoan, index) => (
                            <section key={singleLoan.id} className="users__history-container">
                                <div className="users__history-box">
                                    <p className="users__history-header">NUM</p>
                                    <p className="users__history-text">{index + 1}</p>
                                </div>
                                <div className="users__history-box">
                                    <p className="users__history-header">LOAN</p>
                                    <p className="users__history-text">${singleLoan.loan_amount}</p>
                                </div>
                                <div className="users__history-box">
                                    <p className="users__history-header">BORROWED</p>
                                    <p className="users__history-text">
                                        {new Date(singleLoan.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="users__history-box">
                                    <p className="users__history-header">PAID</p>
                                    <p className="users__history-text">
                                        {new Date(singleLoan.updated_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="users__history-box">
                                    <p className="users__history-header">STATUS</p>
                                    <p className="users__history-text">{singleLoan.status}</p>
                                </div>
                            </section>
                        ))}
                    </>
                ) : (
                    <p className="users__history-no-loan">You have no loan history.</p>
                )
                }
            </section>
            {/* <UsersHistory /> */}
        </article>
    )
}