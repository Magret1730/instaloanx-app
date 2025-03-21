import "./LoanForm.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

export default function LoanForm() {
    const [ loading, setLoading ] = useState(true);
    const [isDropdown, setIsDropdown] = useState(false);
    const [selectedPurpose, setSelectedPurpose] = useState("Select Purpose");

    // sets for form field
    const [ amount, setAmount ] = useState("");
    const [ purpose, setPurpose ] = useState("");

    // Loan status
    const [hasActiveLoan, setHasActiveLoan] = useState(false);

    // Loan purposes options
    const purposes = ["Education", "Business", "Medical", "Personal", "Other"];

    const navigate = useNavigate();

    // Check if user has an active loan
    useEffect(() => {
        const fetchLoanStatus = async () => {
            try {
                const id = localStorage.getItem("id");
                const isAdmin = localStorage.getItem("is_admin");

                // Fetches all loan history of a single user
                const response = await InstaloanxApi.getLoansByUserId(id); 

                const loanHistory = response.data?.data || []; // Ensures it's an array

                // If no active loan or pending or null, return null explicitly
                const activeLoan = loanHistory.loans.find(
                    (loan) => loan.status === "Active" || loan.status === "Pending" || loan.status === null
                ) || null;

                // Stops admin from applyig for loan,
                if (isAdmin === "1") {
                    toast.error("Admin cannot apply for loan");
                    // navigate(`/admin/${id}`);
                    navigate("/admin");
                    return;
                }

                // Checks for active or pending loan, if found navigates back to dashboard
                if (activeLoan) {
                    setHasActiveLoan(true);
                    toast.error("You already have an active or pending loan.");
                    // navigate(`/users/${id}`);
                    navigate("/dashboard");
                }
            } catch (error) {
                console.error("Error fetching loan status:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLoanStatus();
    }, []);

    const handleDropDown = () => {
        setIsDropdown(!isDropdown);
        // setIsDropdown((prev) => !prev);
    }

    const handlePurposeClick = (selected) => {
        setPurpose(selected);
        setSelectedPurpose(selected); // Updates the selected purpose
        setIsDropdown(false); // CLoses the dropdown - not functional and don't know why
    };

    if (loading) {
        return <Spinner loading={loading} />
    }

    // Validate amount
    const isAmountValid = (amount) => {
        if (!amount) {
            toast.error("Loan amount is required.");
            return false;
        } else if (isNaN(amount) || Number(amount) <= 0) {
            toast.error("Invalid loan amount.");
            return false;
        } else {
            return true;
        }
    }
    
    // Validate purpose
    const isPurposeValid = (purpose) => {
        if (!purpose || purpose === "Select Purpose") {
            toast.error("Loan purpose is required");
            return false;
        } else if (!purposes.includes(purpose)) {
            toast.error("Invalid loan purpose");
            return false;
        } else {
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


                // posts new loans
                const response = await InstaloanxApi.postLoans(loanData);

                if (response) {
                    toast.success("Loan Application made successfully!!!");
                    // navigate(`/users/${id}`);
                    navigate("/dashboard");
                }
            } else {
                console.error("Error in loan application form");
            }
        } catch (error) {
            console.error("Error in loan application:", error.message);
            toast.error(error.message);
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
                    Loan Amount
                    <input
                        className="loan-form__body-input"
                        type="number"
                        placeholder="Enter the loan amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>

                <label className="loan-form__body-label">
                    Purpose
                    <input
                        className="loan-form__body-dropdown"
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
                </label>
            </section>

            {/* // Loan Form Button */}
            <section className="loan-form__button">
                <button
                    className="loan-form__button-button"
                    type="submit"
                    disabled={hasActiveLoan} // Disables if user has active loan
                >
                    SUBMIT
                </button>
            </section>
        </form>
    );
}