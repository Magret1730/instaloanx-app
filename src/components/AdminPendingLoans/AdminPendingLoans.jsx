import "./AdminPendingLoans.scss";
// import { useState, useEffect } from "react";
// import InstaloanxApi from "../../api/InstaloanxApi";
import { Link, useLocation } from "react-router-dom";

export default function AdminPendingLoans({pendingLoans, adminId}) {

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
                                {/* <Link to={`/usersDetails/${loan.userId}?adminId=${adminId}`}> */}
                                    <p className="admin-pend-text">
                                        <Link className="admin-pend-text--name" to={`/usersDetails/${loan.userId}?adminId=${adminId}`}>
                                        {loan.userName}
                                        </Link>
                                    </p>
                                {/* </Link> */}
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
                                <p className="admin-pend-text">{loan.status}</p>   
                            </div>    
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