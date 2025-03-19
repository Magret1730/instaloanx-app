import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import "./AdminHistory.scss";
import AdminPendingLoans from "../AdminPendingLoans/AdminPendingLoans";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

export default function AdminHistory({ adminId }) {
    const [loans, setLoans] = useState([]);
    const [pendingLoans, setPendingLoans] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null); // For dropdown toggle
    // const [ userId, setUserId ] = useState("");
    
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

                // Filters out pending loans
                const pendingLoan = allLoans.filter(loan => loan.status === "Pending");
                setPendingLoans(pendingLoan);

                const filteredLoans = allLoans
                    .filter(loan => loan.status !== "Pending")
                    .sort((a, b) => new Date( b.updatedAt) - new Date(a.updatedAt));
                setLoans(filteredLoans);
            } else {
                console.error(response.message);
            }
        } catch (err) {
            console.error("Failed to fetch user data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []); // Fetch loans on component mount

    const handleStatusUpdate = async (loanId, newStatus) => {
        try {

            // Finds the loan being updated
            const loanToUpdate = loans.find(loan => loan.loanId === loanId) || 
                                pendingLoans.find(loan => loan.loanId === loanId);

            if (!loanToUpdate) {
                toast.error("Loan not found.");
                return;
            }

            // Checks if the new status is "Active" or "Pending"
            if (newStatus === "Active" || newStatus === "Pending") {
                // Checks if the user already has an active or pending loan (excluding the current loan)
                const hasActiveOrPending = loans.some(loan => 
                    loan.userId === loanToUpdate.userId && 
                    loan.loanId !== loanId && // Exclude the current loan
                    (loan.status === "Active" || loan.status === "Pending")
                ) || pendingLoans.some(loan => 
                    loan.userId === loanToUpdate.userId && 
                    loan.loanId !== loanId && // Exclude the current loan
                    (loan.status === "Active" || loan.status === "Pending")
                );

                if (hasActiveOrPending) {
                    toast.error("User already has an active or pending loan.");
                    return;
                }
            }

            const response = await InstaloanxApi.updateLoanStatus(loanId, newStatus);
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

                toast.success("Status changed successfully!!!");
                setActiveDropdown(false);

                // Forces re-fetch loan data to ensure UI updates correctly
                fetchLoans();
            }
            return response;
        } catch (err) {
            toast.error("Failed to update loan status");
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

    if (loading) {
        return <Spinner loading={loading} />
    }

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

            <section className="admin__history-head">
                <p className="admin__history-head-text">S/N</p>
                <p className="admin__history-head-text">NAME</p>
                <p className="admin__history-head-text">AMOUNT</p>
                <p className="admin__history-head-text">BORROWED</p>
                <p className="admin__history-head-text">PAID</p>
                <p className="admin__history-head-text">STATUS</p>
            </section>

            {loans.length === 0 ? (
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
                            <Link
                                to="/usersDetails"
                                state={{ userId: loan.userId }} // Pass userId into state
                            >
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
                                {/* {["Fully Repaid", "Rejected", "Active", "Pending"].map((option, idx) => ( */}
                                {["Rejected", "Active", "Pending"].map((option, idx) => (
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
