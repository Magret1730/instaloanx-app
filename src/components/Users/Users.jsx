import "./Users.scss";
import UsersHistory from "../UsersHistory/UsersHistory";
import { Link, useNavigate, useParams } from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useState, useEffect } from "react";

// Fetch singer user, fetch loan history
// /users/:id/loans
export default function Users({isAuthenticated}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeLoan, setActiveLoan] = useState(null);
    const [loans, setLoans] = useState(null);

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await InstaloanxApi.getLoansByUserId(id); // Calls the backend function

                if (response.success) {
                    setUser(response.data.data.user);
                    setLoans(response.data.data.loans);

                    // Find active loan
                    const active = response.data.data.loans.find(loan => loan.status === "Active");
                    setActiveLoan(active || null);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    // if (!loans) return <div>loading...</div>;

    return (
        <article className="users__box">
            <section className="users__box-header">
                <section className="users__header">
                    <p className="users__header-header">Hi {user.first_name},</p>
                    <div className="users__header-links">
                        <Link to={isAuthenticated ? "/loanForm" : "/login"}><button className="users__header-button">APPLY LOAN</button></Link>
                        <Link to={isAuthenticated ? "/" : "/login"}><button className="users__header-button">PAY LOAN</button></Link> {/*protect this route in app.js*/}
                    </div>
                </section>

                {/* active loan section */}
                <section className="users__active">
                    <p className="users__active-title">CURRENT LOAN</p>

                    {activeLoan ? (
                        // Render loan details if there's an active loan
                        <>
                            <section className="users__active-head">
                                <p className="users__active-headd">AMOUNT</p>    
                                <p className="users__active-headd">BORROWED</p>    
                                <p className="users__active-headd">PAID</p>    
                                <p className="users__active-headd">STATUS</p>    
                            </section> 

                            <section className="users__active-container">
                                <div className="users__active-box">
                                    <p className="users__active-header">AMOUNT</p>
                                    <p className="users__active-text">${activeLoan.loan_amount}</p>
                                </div>
                                <div className="users__active-box">
                                    <p className="users__active-header">BORROWED</p>
                                    <p className="users__active-text">{new Date(activeLoan.created_at).toLocaleDateString()}</p>   
                                </div> 
                                <div className="users__active-box">
                                    <p className="users__active-header">PAID</p>
                                    <p className="users__active-text">
                                        {activeLoan.remaining_balance === 0 ? "Fully Paid" : "Not Yet"}
                                    </p>   
                                </div> 
                                <div className="users__active-box">
                                    <p className="users__active-header">STATUS</p>
                                    <p className="users__active-text">{activeLoan.status}</p>   
                                </div>    
                            </section>
                        </>
                    ) : (
                        // Render a message and "Apply Loan" button if there's no active loan
                        <section className="users__active-no-loan">
                            <p className="users__active-no-loan-text">You have no active loan.</p>
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
                {loans.length > 0 ? (
                    <>
                        {/* Render the table header */}
                        <section className="users__history-head">
                            <p className="users__history-head-text">NUM</p>
                            <p className="users__history-head-text">AMOUNT</p>
                            <p className="users__history-head-text">BORROWED</p>
                            <p className="users__history-head-text">PAID</p>
                            <p className="users__history-head-text">STATUS</p>
                        </section>

                        {/* Map through loans and render each loan */}
                        {loans.map((singleLoan, index) => (
                            <section key={singleLoan.id} className="users__history-container">
                                <div className="users__history-box">
                                    <p className="users__history-header">NUM</p>
                                    <p className="users__history-text">{index + 1}</p>
                                </div>
                                <div className="users__history-box">
                                    <p className="users__history-header">AMOUNT</p>
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
                                        {singleLoan.remaining_balance === 0
                                            ? "Fully Paid"
                                            : "Not Yet"
                                        }
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
            <UsersHistory />
        </article>
    )
}