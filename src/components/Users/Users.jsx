import "./Users.scss";
import UsersHistory from "../UsersHistory/UsersHistory";
import { Link, useNavigate } from "react-router-dom";
// import {getUserById, getUserIdFromToken} from "../../api/InstaloanxApi";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useState, useEffect } from "react";

// Check if user is authenticated, if not: redirect to login page
// else open the user dashboard
// if no active loan: display - No active loan in the active loan section
// if no history: display - No history in the loan history section

export default function Users({isAuthenticated}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeLoan, setActiveLoan] = useState(null);
    const [loans, setLoans] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const {id} = await InstaloanxApi.getUserIdFromToken(); // Get the ID from the token
            // console.log(userId);
            if (!id) {
                setError("User ID not found");
                setLoading(false);
                return;
            }

            try {
                // const response = await InstaloanxApi.login(newUser);
                const response = await InstaloanxApi.getLoansByUserId(id); // Call the backend function
                const respData = await InstaloanxApi.getUserIdFromToken(); 
                // console.log("response.data: ", response.data.data);
                // console.log( "respdata: ", respData);

                if (response.success) {
                // if (response) {
                    // setUser(response.data.data, respData); // Set the user data
                    // setUser(...response.data.data, ...respData);

                // Combine response.data.data and respData into a single object
                const combinedData = {
                    ...response.data.data, // Spread loan data
                    ...respData, // Spread user data
                };

                setUser(combinedData); // Set the combined data
                } else {
                    setError(response.message); // Handle error
                }
            } catch (err) {
                setError("Failed to fetch user data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchActiveLoan = async () => {
            try {
                const { id } = await InstaloanxApi.getUserIdFromToken(); // Get the user ID
                if (!id) {
                    setError("User ID not found");
                    return;
                }

                const response = await InstaloanxApi.getLoansByUserId(id); // Fetch loans
                // console.log(response.data.data);
                if (response.success) {
                    // set loans
                    setLoans(response.data.data);
                    // Find the active loan
                    const active = response.data.data.find(loan => loan.status === "Active");
                    setActiveLoan(active || null); // Set active loan or null if none
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError(`Failed to fetch active loan: ${err.message}`);
            }
        };

        fetchActiveLoan();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // console.log(user);
    console.log(loans);

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
                            <button className="users__active-no-loan-button" onClick={() => navigate("/apply-loan")}>
                                Apply for a Loan
                            </button>
                        </section>
                    )}
                </section>
            </section> 

            {/* users history */}
            <section className="users__history">
                <h3 className="users__history-title">LOAN HISTORY</h3>

                {/* { loans.map((singleLoan) => {
                <>
                    <section className="users__history-head">
                        <p className="users__history-head-text">NUM</p>
                        <p className="users__history-head-text">AMOUNT</p>    
                        <p className="users__history-head-text">BORROWED</p>    
                        <p className="users__history-head-text">PAID</p>    
                        <p className="users__history-head-text">STATUS</p>
                    </section>

                    <section>
                        <section className="users__history-container">
                            <div className="users__history-box">
                                <p className="users__history-header">NUM</p>
                                <p className="users__history-text">1</p>   
                            </div>
                            <div className="users__history-box">
                                <p className="users__history-header">AMOUNT</p>
                                <p className="users__history-text">$35,000</p>   
                            </div>
                            <div className="users__history-box">
                                <p className="users__history-header">BORROWED</p>
                                <p className="users__history-text">01-12-2021</p>   
                            </div>
                            <div className="users__history-box">
                                <p className="users__history-header">PAID</p>
                                <p className="users__history-text">03-07-2021</p>   
                            </div>
                            <div className="users__history-box">
                                <p className="users__history-header">STATUS</p>
                                <p className="users__history-text">FULLY PAID</p>   
                            </div>
                        </section> 
                    </section>
                </>
                })} */}

                {/* <section className="users__history-head">
                    <p className="users__history-head-text">NUM</p>
                    <p className="users__history-head-text">AMOUNT</p>    
                    <p className="users__history-head-text">BORROWED</p>    
                    <p className="users__history-head-text">PAID</p>    
                    <p className="users__history-head-text">STATUS</p>
                </section>

                <section>
                    <section className="users__history-container">
                        <div className="users__history-box">
                            <p className="users__history-header">NUM</p>
                            <p className="users__history-text">1</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">AMOUNT</p>
                            <p className="users__history-text">$35,000</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">BORROWED</p>
                            <p className="users__history-text">01-12-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">PAID</p>
                            <p className="users__history-text">03-07-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">STATUS</p>
                            <p className="users__history-text">FULLY PAID</p>   
                        </div>
                    </section> 
                </section> */}
            </section>
            <UsersHistory />
        </article>
    )
}