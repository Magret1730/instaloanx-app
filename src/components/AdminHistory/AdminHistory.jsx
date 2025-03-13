// import "./AdminHistory.scss";
// import { Link } from "react-router-dom";

// export default function AdminHistory({loanData}) {
//     return (
//         <section className="admin__history">
//             <section className="admin__history-up">
//                 <input className="admin__history-up-search" placeholder="Search..."/>
//             </section>
            
//             <section className="admin__history-head">
//                 <p className="admin__history-head-text">S/N</p>
//                 <p className="admin__history-head-text">NAME</p>
//                 <p className="admin__history-head-text">AMOUNT</p>    
//                 <p className="admin__history-head-text">BORROWED</p>    
//                 <p className="admin__history-head-text">PAID</p>    
//                 <p className="admin__history-head-text">STATUS</p>
//             </section>

//             {/* A details page for each of the users to see full details e.g purpose and loan history */}
//             {/* Make it a component during functionality*/}
//             {loanData.map((loan, index) => (
//                 <section key={loan.id}>
//                     <section className="admin__history-container">
//                         <div className="admin__history-box">
//                             <p className="admin__history-header">S/N</p>
//                             <p className="admin__history-text">{index + 1}</p>   
//                         </div>
//                         <div className="admin__history-box">
//                             <p className="admin__history-header">NAME</p>
//                             <Link to="/usersDetails"><p className="admin__history-text admin__history-text--name">{`${loan.first_name} ${loan.last_name}`}</p></Link> 
//                         </div>
//                         <div className="admin__history-box">
//                             <p className="admin__history-header">AMOUNT</p>
//                             <p className="admin__history-text">${loan.loan_amount}</p>   
//                         </div>
//                         <div className="admin__history-box">
//                             <p className="admin__history-header">BORROWED</p>
//                             <p className="admin__history-text">{new Date(loan.created_at).toLocaleDateString()}</p>   
//                         </div>
//                         <div className="admin__history-box">
//                             <p className="admin__history-header">PAID</p>
//                             <p className="admin__history-text">
//                                 {loan.remaining_balance === 0
//                                     ? "Fully Paid"
//                                     : "Not Yet"
//                                 }
//                             </p>   
//                         </div>
//                         <div className="admin__history-box">
//                             <p className="admin__history-header">STATUS</p>
//                             <p className="admin__history-text">{loan.status}</p>   
//                         </div>
//                     </section>
//                 </section>
//             ))}
//         </section>
//     )
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import "./AdminHistory.scss";

export default function AdminHistory({ loanData }) {
    const [users, setUsers] = useState({});


    useEffect(() => {
        async function fetchUsers() {
            const userMap = {};
            for (const loan of loanData) {
                // console.log(loan);
                // console.log(loan.user_id);
                if (!userMap[loan.user_id]) {
                    const response = await InstaloanxApi.getUserById(loan.user_id);
                    // console.log(response);
                    if (response.success) {
                        // console.log(response.data);
                        userMap[loan.user_id] = response.data;
                    }
                }
            }

            // console.log(userMap);
            setUsers(userMap);
        }

        if (loanData.length) {
            fetchUsers();
        }
    }, [loanData]);

    return (
        <section className="admin__history">
            <section className="admin__history-up">
                <input className="admin__history-up-search" placeholder="Search..." />
            </section>

            <section className="admin__history-head">
                <p className="admin__history-head-text">S/N</p>
                <p className="admin__history-head-text">NAME</p>
                <p className="admin__history-head-text">AMOUNT</p>
                <p className="admin__history-head-text">BORROWED</p>
                <p className="admin__history-head-text">PAID</p>
                <p className="admin__history-head-text">STATUS</p>
            </section>

            {loanData.map((loan, index) => (
                <section key={loan.id} className="admin__history-container">
                    <div className="admin__history-box">
                        <p className="admin__history-header">S/N</p>
                        <p className="admin__history-text">{index + 1}</p>
                    </div>
                    <div className="admin__history-box">
                        <p className="admin__history-header">NAME</p>
                        <Link to="/usersDetails">
                            <p className="admin__history-text admin__history-text--name">
                                {users[loan.user_id] 
                                    ? `${users[loan.user_id].data.first_name} ${users[loan.user_id].data.last_name}` 
                                    : "Loading..."}
                            </p>
                        </Link>
                    </div>
                    <div className="admin__history-box">
                        <p className="admin__history-header">AMOUNT</p>
                        <p className="admin__history-text">${loan.loan_amount}</p>
                    </div>
                    <div className="admin__history-box">
                        <p className="admin__history-header">BORROWED</p>
                        <p className="admin__history-text">{new Date(loan.created_at).toLocaleDateString()}</p>
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
            ))}
        </section>
    );
}
