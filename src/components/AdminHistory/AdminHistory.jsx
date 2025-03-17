import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import "./AdminHistory.scss";
import AdminPendingLoans from "../AdminPendingLoans/AdminPendingLoans";

export default function AdminHistory({adminId}) {
    const [loans, setLoans] = useState([]);
    const [pendingLoans, setPendingLoans] = useState([]);
    // const [history, setHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // console.log(loanData);

    useEffect(() => {
        const fetchLaons = async () => {
            try {
                // Calls the backend function to get loan history
                const response = await InstaloanxApi.getLoanHistory(); 

                if (response.success) {
                    const usersData = response.data.data;
                    // console.log(usersData);


                    // Flatten loans data from users and update the loans state
                    const allLoans = usersData.flatMap(user => 
                        user.loans.map(loan => ({
                            ...loan,
                            userId: user.userId,
                            userName: `${user.firstName} ${user.lastName}`
                        }))
                    );

                    // Finds pending loans
                    const pendingLoan = allLoans.filter(loan => loan.status === "Pending");
                    setPendingLoans(pendingLoan);

                    // Stores all loans EXCLUDING pending ones
                    const filteredLoans = allLoans.filter(loan => loan.status !== "Pending");
                    setLoans(filteredLoans); // Stores all loans except pending loans
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError("Failed to fetch user data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLaons();
    }, []);

    const handleStatusUpdate = async (loanId, newStatus) => {
        try {
            const response = await InstaloanxApi.updateLoanStatus(loanId, newStatus);
            if (response.success) {
                setPendingLoans(prevPendingLoans =>
                    prevPendingLoans.filter(loan => loan.loanId !== loanId)
                );
                setLoans(prevLoans => [
                    ...prevLoans,
                    { ...pendingLoans.find(loan => loan.loanId === loanId), status: newStatus }
                ]);
            }
            return response;
        } catch (err) {
            console.error("Failed to update loan status", err);
            throw err;
        }
    };


    // Filters out pending loans and apply search query
    const filteredLoans = loans.filter(loan => {
        if (!searchQuery) return true; // If no search query, returns all loans

        const lowerCaseQuery = searchQuery.toLowerCase();
        const userName = loan.userName.toLowerCase();
        const loanStatus = loan.status.toLowerCase();

        return (
            userName.includes(lowerCaseQuery) || loanStatus.includes(lowerCaseQuery)
        );
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
            <AdminPendingLoans pendingLoans={pendingLoans} adminId={adminId} handleStatusUpdate={handleStatusUpdate}/>

            {error && <p className="error-message">{error}</p>} {/* Displays error message */}

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
                                {loan.remaining_balance === 0 ? "Fully Paid" : "Not Yet"}
                            </p>
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">STATUS</p>
                            <p className="admin__history-text">{loan.status}</p>
                        </div>
                    </section>
                ))
            )}
        </section>
    );
}
