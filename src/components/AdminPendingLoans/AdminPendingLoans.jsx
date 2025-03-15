// // import "./AdminPendingLoans.scss";
// // import { useState, useEffect } from "react";
// // import InstaloanxApi from "../../api/InstaloanxApi";
// // import { useNavigate } from "react-router-dom";

// // export default function AdminPendingLoans() {
// //     const [activeLoan, setActiveLoan] = useState(null);
// //     const [loans, setLoans] = useState(null);
// //     // const [loading, setLoading] = useState(true);
// //     // const [error, setError] = useState(null);

// //     // const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchActiveLoan = async () => {
// //             try {
// //                 // const { id } = await InstaloanxApi.getUserIdFromToken(); // Get the user ID
// //                 // if (!id) {
// //                 //     setError("User ID not found from fetchActiveLoan from users.jsx");
// //                 //     return;
// //                 // }

// //                 // const response = await InstaloanxApi.getLoansByUserId(id); // Fetch loans
// //                 const response = await InstaloanxApi.getAllLoans(); // Fetch loans
// //                 // console.log(response.data.data);
// //                 if (response.success) {
// //                     // set loans
// //                     setLoans(response.data.data);
// //                     // console.log(response.data);
// //                     console.log(response.data.data);

// //                     // Finds the active loan
// //                     const active = response.data.data.find(loan => loan.status === "Pending");
// //                     setActiveLoan(active || null); // Set active loan or null if none
// //                 } else {
// //                     setError(response.message);
// //                 }
// //             } catch (err) {
// //                 setError(`Failed to fetch active loan: ${err.message}`);
// //             }
// //         };

// //         fetchActiveLoan();
// //     }, []);

// //     if (!loans) return <div>loading...</div>;

// //     return (
// //         // {/* active loan section */}
// //         <section className="admin-pend">
// //             <p className="admin-pend-title">CURRENT LOAN</p>

// //             {activeLoan ? (
// //                 // Render loan details if there's an active loan
// //                 <>
// //                     <section className="admin-pend-head">
// //                         <p className="admin-pend-headd">AMOUNT</p>    
// //                         <p className="admin-pend-headd">BORROWED</p>    
// //                         <p className="admin-pend-headd">PAID</p>    
// //                         <p className="admin-pend-headd">STATUS</p>    
// //                     </section> 

// //                     <section className="admin-pend-container">
// //                         <div className="admin-pend-box">
// //                             <p className="admin-pend-header">AMOUNT</p>
// //                             <p className="admin-pend-text">${activeLoan.loan_amount}</p>
// //                         </div>
// //                         <div className="admin-pend-box">
// //                             <p className="admin-pend-header">BORROWED</p>
// //                             <p className="admin-pend-text">{new Date(activeLoan.created_at).toLocaleDateString()}</p>   
// //                         </div> 
// //                         <div className="admin-pend-box">
// //                             <p className="admin-pend-header">PAID</p>
// //                             <p className="admin-pend-text">
// //                                 {activeLoan.remaining_balance === 0 ? "Fully Paid" : "Not Yet"}
// //                             </p>   
// //                         </div> 
// //                         <div className="admin-pend-box">
// //                             <p className="admin-pend-header">STATUS</p>
// //                             <p className="admin-pend-text">{activeLoan.status}</p>   
// //                         </div>    
// //                     </section>
// //                 </>
// //             ) : (
// //                 // Render a message and "Apply Loan" button if there's no active loan
// //                 <section className="admin-pend-no-loan">
// //                     <p className="admin-pend-no-loan-text">There are no pending loan request</p>
// //                 </section>
// //             )}
// //         </section>
// //     )
// // }

// import "./AdminPendingLoans.scss";
// import { useState, useEffect } from "react";
// import InstaloanxApi from "../../api/InstaloanxApi";

// export default function AdminPendingLoans() {
//     const [pendingLoans, setPendingLoans] = useState([]); // Use an array to store all pending loans
//     const [loans, setLoans] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchLoans = async () => {
//             try {
//                 const response = await InstaloanxApi.getAllLoans(); // Fetch all loans
//                 if (response.success) {
//                     setLoans(response.data.data); // Set all loans
//                     // console.log(response.data.data);

//                     // Filter all pending loans
//                     const pending = response.data.data.filter(loan => loan.status === "Pending");
//                     setPendingLoans(pending); // Set pending loans
//                 } else {
//                     setError(response.message);
//                 }
//             } catch (err) {
//                 setError(`Failed to fetch loans: ${err.message}`);
//             }
//         };

//         fetchLoans();
//     }, []);

//     if (!loans) return <div>Loading...</div>;

//     return (
//         <section className="admin-pend">
//             <p className="admin-pend-title">PENDING LOANS</p>

//             {pendingLoans.length > 0 ? (
//                 // Render pending loans if there are any
//                 <>
//                     <section className="admin-pend-head">
//                         <p className="admin-pend-headd">S/N</p>
//                         <p className="admin-pend-headd">NAME</p>
//                         <p className="admin-pend-headd">AMOUNT</p>    
//                         <p className="admin-pend-headd">BORROWED</p>      
//                         <p className="admin-pend-headd">STATUS</p>    
//                     </section> 

//                     {pendingLoans.map((loan, index) => (
//                         <section key={loan.id} className="admin-pend-container">
//                             <div className="admin-pend-box">
//                                 <p className="admin-pend-header">S/N</p>
//                                 <p className="admin-pend-text">{index + 1}</p>
//                             </div>
//                             <div className="admin-pend-box">
//                                 <p className="admin-pend-header">NAME</p>
//                                 <p className="admin-pend-text">
//                                     {loan.remaining_balance === 0 ? "Fully Paid" : "Not Yet"}
//                                 </p>   
//                             </div> 
//                             <div className="admin-pend-box">
//                                 <p className="admin-pend-header">AMOUNT</p>
//                                 <p className="admin-pend-text">${loan.loan_amount}</p>
//                             </div>
//                             <div className="admin-pend-box">
//                                 <p className="admin-pend-header">BORROWED</p>
//                                 <p className="admin-pend-text">{new Date(loan.created_at).toLocaleDateString()}</p>   
//                             </div> 
//                             <div className="admin-pend-box">
//                                 <p className="admin-pend-header">STATUS</p>
//                                 <p className="admin-pend-text">{loan.status}</p>   
//                             </div>    
//                         </section>
//                     ))}
//                 </>
//             ) : (
//                 // Render a message if there are no pending loans
//                 <section className="admin-pend-no-loan">
//                     <p className="admin-pend-no-loan-text">There are no pending loan requests.</p>
//                 </section>
//             )}
//         </section>
//     );
// }

import "./AdminPendingLoans.scss";
import { useState, useEffect } from "react";
import InstaloanxApi from "../../api/InstaloanxApi";

export default function AdminPendingLoans() {
    const [pendingLoans, setPendingLoans] = useState([]); // Use an array to store all pending loans
    const [loans, setLoans] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await InstaloanxApi.getAllLoans(); // Fetch all loans
                if (response.success) {
                    setLoans(response.data.data); // Set all loans

                    // Fetch user details for each loan
                    const loansWithUsers = await Promise.all(
                        response.data.data.map(async (loan) => {
                            const userResponse = await InstaloanxApi.getUserById(loan.user_id);
                            return {
                                ...loan, // Includes loan details
                                user: userResponse.success ? userResponse.data : null, // Adds user details
                            };
                        })
                    );

                    // Filter all pending loans
                    const pending = loansWithUsers.filter(loan => loan.status === "Pending");
                    setPendingLoans(pending); // Set pending loans with user details
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError(`Failed to fetch loans: ${err.message}`);
            }
        };

        fetchLoans();
    }, []);

    if (!loans) return <div>Loading...</div>;

    return (
        <section className="admin-pend">
            <p className="admin-pend-title">PENDING LOANS</p>

            {pendingLoans.length > 0 ? (
                // Render pending loans if there are any
                <>
                    <section className="admin-pend-head">
                        <p className="admin-pend-headd">S/N</p>
                        <p className="admin-pend-headd">NAME</p>
                        <p className="admin-pend-headd">AMOUNT</p>    
                        <p className="admin-pend-headd">BORROWED</p>      
                        <p className="admin-pend-headd">STATUS</p>    
                    </section> 

                    {pendingLoans.map((loan, index) => (
                        <section key={loan.id} className="admin-pend-container">
                            <div className="admin-pend-box">
                                <p className="admin-pend-header">S/N</p>
                                <p className="admin-pend-text">{index + 1}</p>
                            </div>
                            <div className="admin-pend-box">
                                <p className="admin-pend-header">NAME</p>
                                <p className="admin-pend-text">
                                    {loan.user 
                                        ? `${loan.user.data.first_name} ${loan.user.data.last_name}`
                                        : "Loading..."}
                                </p>   
                            </div> 
                            <div className="admin-pend-box">
                                <p className="admin-pend-header">AMOUNT</p>
                                <p className="admin-pend-text">${loan.loan_amount}</p>
                            </div>
                            <div className="admin-pend-box">
                                <p className="admin-pend-header">BORROWED</p>
                                <p className="admin-pend-text">{new Date(loan.created_at).toLocaleDateString()}</p>   
                            </div> 
                            <div className="admin-pend-box">
                                <p className="admin-pend-header">STATUS</p>
                                <p className="admin-pend-text">{loan.status}</p>   
                            </div>    
                        </section>
                    ))}
                </>
            ) : (
                // Render a message if there are no pending loans
                <section className="admin-pend-no-loan">
                    <p className="admin-pend-no-loan-text">There are no pending loan requests.</p>
                </section>
            )}
        </section>
    );
}