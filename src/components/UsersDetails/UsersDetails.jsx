import "./UsersDetails.scss";
import { Link } from "react-router-dom";

export default function UserDetails() {
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
                    <p className="user-details__info-label">Full Name</p>
                    <p className="user-details__info-text">John Doe</p>
                </div>
                <div className="user-details__info-group">
                    <p className="user-details__info-label">Email</p>
                    <p className="user-details__info-text">johndoe@example.com</p>
                </div>
                <div className="user-details__info-group">
                    <p className="user-details__info-label">Phone Number</p>
                    <p className="user-details__info-text">+123 456 7890</p>
                </div>
            </section>

            <section className="user-details__loan-history">
                <h2 className="user-details__loan-history-title">Loan History</h2>

                {/* Loan 1 */}
                <section className="user-details__loan-history-item">
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Amount</p>
                        <p className="user-details__loan-history-text">$35,000</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Borrowed</p>
                        <p className="user-details__loan-history-text">01-12-2021</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Paid</p>
                        <p className="user-details__loan-history-text">03-07-2021</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Status</p>
                        <p className="user-details__loan-history-text">FULLY PAID</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Purpose</p>
                        <p className="user-details__loan-history-text">
                            This loan will be used to cover the cost of renovating my small
                            business premises, including new furniture and equipment.
                        </p>
                    </div>
                </section>

                {/* Loan 2 */}
                <section className="user-details__loan-history-item">
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Amount</p>
                        <p className="user-details__loan-history-text">$35,000</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Borrowed</p>
                        <p className="user-details__loan-history-text">01-12-2021</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Paid</p>
                        <p className="user-details__loan-history-text">03-07-2021</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Status</p>
                        <p className="user-details__loan-history-text">FULLY PAID</p>
                    </div>
                    <div className="user-details__loan-history-group">
                        <p className="user-details__loan-history-label">Purpose</p>
                        <p className="user-details__loan-history-text">
                            Education Research.
                        </p>
                    </div>
                </section>
            </section>
        </section>
    );
}
