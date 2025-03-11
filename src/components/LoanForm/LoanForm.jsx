import "./LoanForm.scss";
import { useState } from "react";
// import { Link } from "react-router-dom";

export default function LoanForm() {
    const [isDropdown, setIsDropdown] = useState(false);
    const [selectedPurpose, setSelectedPurpose] = useState("Select Purpose");

    const purposes = ["Education", "Business", "Medical", "Personal", "Other"];

    const handleDropDown = () => {
        setIsDropdown(!isDropdown);
    }

    const handlePurposeClick = (purpose) => {
        setSelectedPurpose(purpose); // Updates the selected purpose
        setIsDropdown(false); // Closes the dropdown
    };

    return (
        <section className="loan-form">
            {/* Handle back to users page */}
            <section className="loan-form__header">
                <h1 className="loan-form__header-title">Loan Application</h1>
                <p className="loan-form__header-subtitle">
                    Fill out the form to apply for a loan.
                </p>
            </section>

            <section className="loan-form__body">
                <label className="loan-form__body-label">
                    FULL NAME
                    <input
                        className="loan-form__body-input"
                        type="text"
                        placeholder="Enter your full name"
                    />
                </label>
                <label className="loan-form__body-label">
                    EMAIL
                    <input
                        className="loan-form__body-input"
                        type="email"
                        placeholder="Enter your email"
                    />
                </label>
                <label className="loan-form__body-label">
                    LOAN AMOUNT
                    <input
                        className="loan-form__body-input"
                        type="number"
                        placeholder="Enter the loan amount"
                    />
                </label>
                <label className="loan-form__body-label">
                    PURPOSE
                    <input
                        className="loan-form__body-dropdown"
                        type="text"
                        placeholder="Enter loan purpose"
                        value= {selectedPurpose}
                        onClick = {handleDropDown}
                        readOnly // Makes the input read-only to prevent manual typing
                    />

                    <section className="loan-form__body-dropdown-lists">
                        {isDropdown && (
                            <section className="loan-form__body-dropdown-list">
                                {purposes.map((purpose, index) => (
                                    <div
                                        key={index}
                                        className="loan-form__body-dropdown-option"
                                        onClick={() => handlePurposeClick(purpose)}
                                    >
                                        {purpose}
                                    </div>
                                ))}
                            </section>
                        )}
                    </section>
                </label>
            </section>

            <section className="loan-form__button">
                <button className="loan-form__button-button">SUBMIT</button>
            </section>
        </section>
    );
}