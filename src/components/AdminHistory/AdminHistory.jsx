
// If active on that user, error message, user already has an active loan
// If any status is clicked on the admin history, it isn't updated until refreshed... why?.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import "./AdminHistory.scss";
import AdminPendingLoans from "../AdminPendingLoans/AdminPendingLoans";

export default function AdminHistory({ adminId }) {
    const [loans, setLoans] = useState([]);
    const [pendingLoans, setPendingLoans] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [fetchLoans, setFetchLoans] = useState("");
    const [activeDropdown, setActiveDropdown] = useState(null); // For dropdown toggle

    // useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await InstaloanxApi.getLoanHistory();
                if (response.success) {
                    const usersData = response.data.data;
                    const allLoans = usersData.flatMap(user =>
                        user.loans.map(loan => ({
                            ...loan,
                            userId: user.userId,
                            userName: `${user.firstName} ${user.lastName}`,
                        }))
                    );

                    const pendingLoan = allLoans.filter(loan => loan.status === "Pending");
                    setPendingLoans(pendingLoan);

                    const filteredLoans = allLoans.filter(loan => loan.status !== "Pending");
                    setLoans(filteredLoans);
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError("Failed to fetch user data", err);
            } finally {
                setLoading(false);
            }
        };

        // setFetchLoans(fetchLoans());
        // fetchLoans();
    // }, []);

    useEffect(() => {
        fetchLoans();
    }, []); // Fetch loans on component mount

    const handleStatusUpdate = async (loanId, newStatus) => {
        try {
            const response = await InstaloanxApi.updateLoanStatus(loanId, newStatus);
            // console.log(response);
            if (response.success) {
                // Updates the loans state
                setLoans(prevLoans =>
                    prevLoans.map(loan =>
                        loan.loanId === loanId ? { ...loan, status: newStatus } : loan
                    )
                );
                // If the loan was in pendingLoans, this removes it
                setPendingLoans(prevPendingLoans =>
                    prevPendingLoans.filter(loan => loan.loanId !== loanId)
                );

                setActiveDropdown(false);

                // Forces re-fetch loan data to ensure UI updates correctly
                fetchLoans();
            }
            return response;
        } catch (err) {
            console.error("Failed to update loan status", err);
            throw err;
        }
    };

    const handleDropDown = (loanId) => {
        setActiveDropdown(prev => (prev === loanId ? null : loanId)); // Toggles dropdown
    };

    const filteredLoans = loans.filter(loan => {
        if (!searchQuery) return true;
        const lowerCaseQuery = searchQuery.toLowerCase();
        const userName = loan.userName.toLowerCase();
        const loanStatus = loan.status.toLowerCase();
        return userName.includes(lowerCaseQuery) || loanStatus.includes(lowerCaseQuery);
    });

    if (loading) return <div>Loading...</div>;

    return (
        <section className="admin__history">
            <section className="admin__history-up">
                <input
                    className="admin__history-up-search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </section>

            {/* Admin Pending Loans section */}
            <AdminPendingLoans
                pendingLoans={pendingLoans}
                adminId={adminId}
                handleStatusUpdate={handleStatusUpdate}
            />

            {error && <p className="error-message">{error}</p>}

            <section className="admin__history-head">
                <p className="admin__history-head-text">S/N</p>
                <p className="admin__history-head-text">NAME</p>
                <p className="admin__history-head-text">AMOUNT</p>
                <p className="admin__history-head-text">BORROWED</p>
                <p className="admin__history-head-text">PAID</p>
                <p className="admin__history-head-text">STATUS</p>
            </section>

            {loans.length === 0 && !error ? (
                <p>No loans found.</p>
            ) : (
                filteredLoans.map((loan, index) => (
                    <section key={index} className="admin__history-container">
                        <div className="admin__history-box">
                            <p className="admin__history-header">S/N</p>
                            <p className="admin__history-text">{index + 1}</p>
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">NAME</p>
                            <Link to={`/usersDetails/${loan.userId}?adminId=${adminId}`}>
                                <p className="admin__history-text admin__history-text--name">
                                    {loan.userName}
                                </p>
                            </Link>
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">AMOUNT</p>
                            <p className="admin__history-text">${loan.loanAmount}</p>
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">BORROWED</p>
                            <p className="admin__history-text">{new Date(loan.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">PAID</p>
                            <p className="admin__history-text">
                                {loan.remaining_balance === 0 ? "Fully Repaid" : "Not Yet"}
                            </p>
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">STATUS</p>
                            <input
                                className="admin__history-box-input"
                                type="text"
                                value={loan.status}
                                onClick={() => handleDropDown(loan.loanId)}
                                readOnly
                            />
                        </div>
                        

                        {/* Dropdown for status update */}
                        {activeDropdown === loan.loanId && (
                            <section className="admin__history-dropdown">
                                {["Fully Repaid", "Rejected", "Active", "Pending"].map((option, idx) => (
                                    <div
                                        key={idx}
                                        className="admin__history-dropdown-option"
                                        onClick={() => handleStatusUpdate(loan.loanId, option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </section>
                        )}
                    </section>
                ))
            )}
        </section>
    );
}
