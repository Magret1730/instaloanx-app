import "./AdminPendingLoans.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

export default function AdminPendingLoans({pendingLoans, adminId, handleStatusUpdate}) {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleStatusChange = async (loanId, newStatus) => {
        try {
            const response = await handleStatusUpdate(loanId, newStatus);
            if (response.success) {
                toast.success("Status changed successfully!!!");
                setActiveDropdown(null); // Closes dropdown after selection
            }
        } catch (err) {
            toast.error("Failed to update loan status");
            console.error("Failed to update loan status", err);
        }
    };

    const handleDropDown = (loanId) => {
        setActiveDropdown(prev => (prev === loanId ? null : loanId)); // Toggles only for the clicked loan
    };

    return (
        <section className="admin-pend">
            <p className="admin-pend-title">PENDING LOANS</p>

            {pendingLoans.length > 0 ? (
                // Renders pending loans if there are any
                <>
                    <section className="admin-pend-head">
                        <p className="admin-pend-headd">S/N</p>
                        <p className="admin-pend-headd">NAME</p>
                        <p className="admin-pend-headd">AMOUNT</p>    
                        <p className="admin-pend-headd">BORROWED</p>      
                        <p className="admin-pend-headd">STATUS</p>    
                    </section> 

                    {pendingLoans.map((loan, index) => (
                        <section key={index} className="admin-pend-container">
                            <div className="admin-pend-box">
                                <p className="admin-pend-header">S/N</p>
                                <p className="admin-pend-text">{index + 1}</p>
                            </div>
                            <div className="admin-pend-box">
                                <p className="admin-pend-header">NAME</p>
                                    <p className="admin-pend-text">
                                        <Link className="admin-pend-text--name" to={`/usersDetails/${loan.userId}?adminId=${adminId}`}>
                                        {loan.userName}
                                        </Link>
                                    </p>
                            </div> 
                            <div className="admin-pend-box">
                                <p className="admin-pend-header">AMOUNT</p>
                                <p className="admin-pend-text">${loan.loanAmount}</p>
                            </div>
                            <div className="admin-pend-box">
                                <p className="admin-pend-header">BORROWED</p>
                                <p className="admin-pend-text">{new Date(loan.createdAt).toLocaleDateString()}</p>   
                            </div> 
                            <div className="admin-pend-box">
                                <p className="admin-pend-header">STATUS</p>
                                <input
                                    className="admin-pend-box-input"
                                    type="text"
                                    value={loan.status}
                                    onClick={() => handleDropDown(loan.loanId)}
                                    readOnly
                                />
                            </div>

                            {activeDropdown === loan.loanId && (
                                <section className="admin-pend-dropdown">
                                    {["Fully Repaid", "Rejected", "Active", "Pending"].map((option, index) => (
                                        <div
                                            key={index}
                                            className="admin-pend-dropdown-option"
                                            onClick={() => handleStatusChange(loan.loanId, option)}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </section>
                            )}
                        </section>
                    ))}
                </>
            ) : (
                // Renders a message if there are no pending loans
                <section className="admin-pend-no-loan">
                    <p className="admin-pend-no-loan-text">There are no pending loan requests.</p>
                </section>
            )}
        </section>
    );
}

