import "./UsersDetails.scss";
import { Link, useParams } from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useState, useEffect } from "react";


export default function UserDetails() {
    const {id} = useParams();

    const [user, setUser] = useState(null);
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        async function fetchUserDetails() {
            const userResponse = await InstaloanxApi.getUserById(id);
            if (userResponse.success) {
                // console.log(userResponse.data.data);
                setUser(userResponse.data.data);
            }

            const loanResponse = await InstaloanxApi.getLoansByUserId(id);
            if (loanResponse.success) {
                // console.log(loanResponse.data.data);
                setLoans(loanResponse.data.data);
            }
        }

        fetchUserDetails();
    }, [id]);

    if (!user) return <p>Loading user details...</p>;

    return (
        <section className="user-details">
            <section className="user-details__header">
                <h1 className="user-details__header-title">User Details</h1>
                <Link to="/admin" className="user-details__header-link">
                    &larr; Back
                </Link>
            </section>

            <section className="user-details__info">
                <div className="user-details__info-group">
                    <p className="user-details__info-label">First Name</p>
                    <p className="user-details__info-text">{user.first_name}</p>
                </div>
                <div className="user-details__info-group">
                    <p className="user-details__info-label">Last Nme</p>
                    <p className="user-details__info-text">{user.last_name}</p>
                </div>
                <div className="user-details__info-group">
                    <p className="user-details__info-label">Email</p>
                    <p className="user-details__info-text">{user.email}</p>
                </div>
            </section>

            <section className="user-details__loan-history">
                <h2 className="user-details__loan-history-title">Loan History</h2>

                {loans.map((loan, index) => (
                <section key={loan.id} className="user-details__loan-history-item">
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">S/N</p>
                        <p className="user-details__loan-history-text">{index + 1}</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Amount</p>
                        <p className="user-details__loan-history-text">${loan.loan_amount}</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Borrowed</p>
                        <p className="user-details__loan-history-text">{new Date(loan.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Paid</p>
                        <p className="user-details__loan-history-text">{new Date(loan.updated_at).toLocaleDateString()}</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Status</p>
                        <p className="user-details__loan-history-text">{loan.status}</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Purpose</p>
                        <p className="user-details__loan-history-text">{loan.loan_purpose}</p>
                    </div>
                </section>
                ))}


            </section>
        </section>
    );
}
