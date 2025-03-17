import "./LoanForm.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";

export default function LoanForm() {
    const [isDropdown, setIsDropdown] = useState(false);
    const [selectedPurpose, setSelectedPurpose] = useState("Select Purpose");

    // sets for form field
    const [ amount, setAmount ] = useState("");
    const [ purpose, setPurpose ] = useState("");

    // sets for errors and messages
    const [ amountError, setAmountError ] = useState("");
    const [ purposeError, setPurposeError ] = useState("");

    // sets error and success messages
    const [ successMessage, setSuccessMessage ] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Loan status
    const [hasActiveLoan, setHasActiveLoan] = useState(false);

    // Loan purposes options
    const purposes = ["Education", "Business", "Medical", "Personal", "Other"];

    const navigate = useNavigate();
    
    const id = localStorage.getItem("id");

    // Check if user has an active loan
    useEffect(() => {
        const fetchLoanStatus = async () => {
            try {
                const id = localStorage.getItem("id");

                // Fetches all loan history of a single user
                const response = await InstaloanxApi.getLoansByUserId(id); 

                const loanHistory = response.data?.data || []; // Ensures it's an array

                // If no active loan or pending or null, return null explicitly
                const activeLoan = loanHistory.loans.find(
                    (loan) => loan.status === "Active" || loan.status === "Pending" || loan.status === null
                ) || null;

                if (activeLoan) {
                    setHasActiveLoan(true);
                    setErrorMessage("You already have an active or pending loan.");
                }
            } catch (error) {
                console.error("Error fetching loan status:", error);
            }
        };

        fetchLoanStatus();
    }, []);

    const handleDropDown = () => {
        setIsDropdown(!isDropdown);
    }

    const handlePurposeClick = (selected) => {
        setPurpose(selected);
        setSelectedPurpose(selected); // Updates the selected purpose
        setIsDropdown(false); // Closes the dropdown
    };

    // Validate amount
    const isAmountValid = (amount) => {
        if (!amount) {
            setAmountError("This field is required");
            return false;
        } else if (isNaN(amount) || Number(amount) <= 0) {
            setAmountError("Invalid loan amount");
            return false;
        } else {
            setAmountError("");
            return true;
        }
    }
    
    // Validate purpose
    const isPurposeValid = (purpose) => {
        // if (!purpose) {
        if (!purpose || purpose === "Select Purpose") {
            setPurposeError("This field is required");
            return false;
        } else if (!purposes.includes(purpose)) {
            setPurposeError("Invalid loan purpose");
            return false;
        } else {
            setPurposeError("");
            return true;
        }
    }

    // Function vaidates the form
    const isFormValid = () => {
        if (!isAmountValid(amount)) {
            return false;
        }

        if (!isPurposeValid(purpose)) {
            return false;
        }

        return true;
    }

    // Reset form fields
    const resetForm = () => {
        // Clear all fields in Add mode
        setAmount("");
        setPurpose("");

        // Clear errors
        setAmountError("");
        setPurposeError("");
    };

    // handles submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (hasActiveLoan) {
                return; // Prevents submission
            }

            if (isFormValid()) {
                const loanData = {
                    amount: amount,
                    purpose: purpose,
                };

                // console.log(loanData);

                // Add new warehouse
                const response = await InstaloanxApi.postLoans(loanData);
                // console.log("LoanForm", response);

                if (response) {
                    // Clear form and errors
                    resetForm();

                    setTimeout(() => {
                        setSuccessMessage("Loan Application made successfully!!!");
                        navigate(`/users/${id}`);
                    }, 3000);
                }
            } else {
                console.error("Error in loan application form");
            }
        } catch (error) {
            console.error("Error in loan application:", error.message);
            setErrorMessage(error.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };


    return (
        <form className="loan-form" onSubmit={handleSubmit}>
            {/* Handle back to users page */}
            <section className="loan-form__header">
                <h1 className="loan-form__header-title">Loan Application</h1>
                <p className="loan-form__header-subtitle">
                    Fill out the form to apply for a loan.
                </p>
            </section>

            <section className="loan-form__body">
                <label className="loan-form__body-label">
                    LOAN AMOUNT
                    <input
                        // className="loan-form__body-input"
                        className={ `loan-form__body-input ${ purposeError ? "loan-form__body-input--error" : "" }` }
                        type="number"
                        placeholder="Enter the loan amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                {amountError && ( // displays error message for amount input
                    <div className="loan-form__error">
                        {amountError}
                    </div>
                )}

                <label className="loan-form__body-label">
                    PURPOSE
                    <input
                        // className="loan-form__body-dropdown"
                        className={ `loan-form__body-dropdown ${ purposeError ? "loan-form__body-input--error" : "" }` }
                        type="text"
                        placeholder="Enter loan purpose"
                        value= {selectedPurpose}
                        onClick = {handleDropDown}
                        onChange={(e) => setPurpose(e.target.value)}
                        readOnly // Makes the input read-only to prevent manual typing
                    />

                    {/* Handles drop down */}
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

                    {purposeError && ( // displays error message for purpose input
                        <div className="loan-form__error">
                            {purposeError}
                        </div>
                    )}
                </label>
            </section>

            {/* // Loan Form Button */}
            <section className="loan-form__button">
                <button
                    className="loan-form__button-button"
                    type="submit"
                    // onClick={handleSubmit}
                    disabled={hasActiveLoan} // Disables if user has active loan
                >
                    SUBMIT
                </button>
            </section>

            {successMessage && (<div className="loan-form__success">{successMessage}</div>)}
            {errorMessage && (<div className="loan-form__error">{errorMessage}</div>)}
        </form>
    );
}