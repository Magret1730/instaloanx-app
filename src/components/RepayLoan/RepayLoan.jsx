import "./RepayLoan.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InstaloanxApi from "../../api/InstaloanxApi";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

export default function RepayLoan() {
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState("");
    const [noActiveLoan, setNoActiveLoan] = useState(false);
    const [activeLoan, setActiveLoan] = useState(null); // Stores active loan details
    const navigate = useNavigate();
    const id = localStorage.getItem("id");

    // Check if user has an active loan
    useEffect(() => {
        const fetchLoanStatus = async () => {
            try {
                // Fetches all loan history of a single user
                const response = await InstaloanxApi.getLoansByUserId(id);
                // console.log("Fetch Loan status", response);

                const loanHistory = response.data?.data || []; // Ensures it's an array
                // console.log(loanHistory);

                // Find active loan
                const activeLoan = loanHistory.loans.find(
                    (loan) => loan.status === "Active"
                ) || null;
                // console.log(activeLoan);

                if (!activeLoan) {
                    setNoActiveLoan(true);
                    toast.error("You don't have an active loan.");
                    navigate("/dashboard");
                } else {
                    setActiveLoan(activeLoan); // Set active loan details
                }
            } catch (error) {
                console.error("Error fetching loan status:", error);
                toast.error("Failed to fetch loan details.");
            } finally {
                setLoading(false);
            }
        };

        fetchLoanStatus();
    }, [id, navigate]);

    if (loading) {
        return <Spinner loading={loading} />;
    }

    // Validate amount
    const isAmountValid = (amount) => {
        if (!amount) {
            toast.error("Repayment amount is required.");
            return false;
        } else if (isNaN(amount) || Number(amount) <= 0) {
            toast.error("Invalid repayment amount.");
            return false;
        } else if (Number(amount) > activeLoan.remaining_balance) {
            toast.error("Repayment amount cannot exceed the remaining balance.");
            return false;
        } else {
            return true;
        }
    };

    // Function validates the form
    const isFormValid = () => {
        if (!isAmountValid(amount)) {
            return false;
        }
        return true;
    };

    // Handles submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (noActiveLoan || !activeLoan) {
                return; // Prevents submission if no active loan
            }

            if (isFormValid()) {
                const repaymentData = {
                    loan_id: activeLoan.id,
                    amount_paid: amount,
                };

                // Posts repayment data
                const response = await InstaloanxApi.repayLoan(id, repaymentData);
                console.log(response);

                if (response) {
                    toast.success("Loan repayment successful!");
                    navigate("/dashboard");
                }
            } else {
                console.error("Error in loan repayment form");
            }
        } catch (error) {
            console.error("Error in loan repayment:", error.message);
            toast.error(error.message);
        }
    };

    return (
        <form className="loan-repay" onSubmit={handleSubmit}>
            <section className="loan-repay__header">
                <h1 className="loan-repay__header-title">Loan Repayment</h1>
                <p className="loan-repay__header-subtitle">
                    Fill out the form to repay your loan.
                </p>
            </section>

            <section className="loan-repay__body">
                <label className="loan-repay__body-label">
                    Repayment Amount
                    <input
                        className="loan-repay__body-input"
                        type="number"
                        placeholder="Enter the repayment amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        // min="0"
                        // max={activeLoan?.remaining_balance || 0}
                    />
                </label>
                {activeLoan && (
                    <p className="loan-repay__body-info">
                        Remaining Balance: ${activeLoan.remaining_balance}
                    </p>
                )}
            </section>

            <section className="loan-repay__button">
                <button
                    className="loan-repay__button-button"
                    type="submit"
                    disabled={noActiveLoan} // Disables if user has no active loan
                >
                    REPAY
                </button>
            </section>
        </form>
    );
}
