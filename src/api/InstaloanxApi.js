import axios from "axios";
// import { useParams } from "react-router-dom";
// import {jwtDecode} from "jwt-decode";

class InstaloanxApi {
    // Backend API base URL
    static BASE_URL = import.meta.env.VITE_BASE_URL;

    // Register user
    static async register(newUser) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/register`, newUser);

            if (response.status !== 201) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // sets token to local storage
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("id", response.data.data.id);
            localStorage.setItem("is_admin", response.data.data.is_admin);

            // Return the response data
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Register error", err);

            return {
                success: false,
                message: err.response ? err.response.data.error || err.response.data.message : "Register: Internal server error",
            };
        }
    }

    // Login user
    static async login(newUser) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/login`, newUser);

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // sets token to local storage
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("id", response.data.data.id);
            localStorage.setItem("is_admin", response.data.data.is_admin);

            // Return the response data
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Login error", err);

            return {
                success: false,
                message: err.response ? err.response.data.error || err.response.data.message : "Login: Internal server error",
            };
        }
    }

    // Forgot password
    static async forgotPassword(email) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/forgotPassword`, { email });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Return the response data
            return { success: true, data: response};
        } catch (err) {
            console.error("Login error", err);

            return {
                success: false,
                message: err.response ? err.response.data.error || err.response.data.message : "Forgot Password: Internal server error",
            };
        }
    }

    // Reset password
    static async resetPassword(newPassword, confirmPassword, token) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/resetPassword`, { newPassword, confirmPassword, token });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Return the response data
            return { success: true, data: response };
        } catch (err) {
            console.error("Login error", err);
            return {
                success: false,
                message: err.response ? err.response.data.error || err.response.data.message : "Reset Password: Internal server error",
            };
        }
    }

    // Fetch all users
    static async getAllUsers() {
        try {
            // Gets the token from localStorage 
            const token = localStorage.getItem("token");

            if (!token) {
                return { success: false, message: "No token found" };
            }

            const response = await axios.get(`${this.BASE_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Return the response data
            return { success: true, data: response.data };  
        } catch (err) {
            console.error(err);

            return {
                success: false,
                message: err.response ? err.response.data.message : "Get All Users: Internal server error"
            };
        }
    }

    // Fetch a single user by ID
    static async getUserById(id) {
        try {
            // Validate ID
            if (isNaN(id) || id <= 0) {
                return { success: false, message: "Invalid user ID" };
            }

            // Gets the token from localStorage 
            const token = localStorage.getItem("token");

            if (!token) {
                return { success: false, message: "No token found" };
            }

            // Make the request with the token in the Authorization header
            const response = await axios.get(`${this.BASE_URL}/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Check if the response is successful
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Return the response data
            return { success: true, data: response.data };
        } catch (err) {
            console.error(err);

            return {
                success: false,
                message: err.response ? err.response.data.message : "Get Users by ID: Internal server error"
            };
        }
    }

    // Fetch all loans
    static async getAllLoans() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return null;
            }

            const response = await axios.get(`${this.BASE_URL}/loans`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token to request headers,
                },
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Return the response data
            return { success: true, data: response.data };
        } catch (err) {
            console.error(err);
            
            return {
                success: false,
                message: err.response ? err.response.data.message : "Get All Loans: Internal server error"
            };
        }
    }

    // Fetch a single user loan details
    // http://localhost:8080/api/v1/users/6/loans
    static async getLoansByUserId(id) {
        try {
            // Validates ID
            if (isNaN(id) || id <= 0) {
                return { success: false, message: "Invalid loan ID" };
            }

            // Gets the token from localStorage 
            const token = localStorage.getItem("token");
            if (!token) {
                return { success: false, message: "No token found" };
            }

            const response = await axios.get(`${this.BASE_URL}/users/${id}/loans`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Return the response data
            return { success: true, data: response.data };
        } catch (err) {
            console.error(err);
            
            return {
                success: false,
                message: err.response ? err.response.data.message : "Get Loans By ID: Internal server error"
            };
        }
    }

    // http://localhost:8080/api/v1/loans/applyLoan
    // Function posts loan application
    static async postLoans(newLoan) {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return null;
            }

            const response = await axios.post(`${this.BASE_URL}/loans/applyLoan`, newLoan, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attached token to request headers
                },
            });

            if (response.status !== 201) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Return the response data
            return { success: true, data: response.data };
            // }
        } catch (err) {
            console.error("PostLoans Error", err);

            return {
                success: false,
                message: err.response ? err.response.data.error || err.response.data.message : "Login: Internal server error",
            };
        }
    }

    // http://localhost:8080/api/v1/loans/loanHistory
    // Fetch loanHistory of all users
    static async getLoanHistory() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return null;
            }

            const response = await axios.get(`${this.BASE_URL}/loans/loanHistory`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token to request headers
                }
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Return the response data
            return { success: true, data: response.data };  
        } catch (err) {
            console.error(err);

            return {
                success: false,
                message: err.response ? err.response.data.message : "Get All Users: Internal server error"
            };
        }
    }

    // http://localhost:8080/api/v1/loans/2/status
    static async updateLoanStatus(loanId, status) {
        try {
            // Checks if authenticated
            const token = localStorage.getItem("token");

            if (!token) {
                return null;
            }

            const response = await axios.put(`${this.BASE_URL}/loans/${loanId}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Return the response data
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Failed to update loan status", err);

            return {
                success: false,
                message: err.response ? err.response.data.message : "Get Users by ID: Internal server error"
            };
        }
    };

    // Handles loan repayment
    // http://localhost:8080/api/v1/loans/1/repayLoan
    static async repayLoan(id, repaymentData) {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return null;
            }

            const response = await axios.put(`${this.BASE_URL}/loans/${id}/repayLoan`, repaymentData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attached token to request headers
                },
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.data;
        } catch (err) {
            console.error("Loan Repayment Error", err.response);

            return {
                success: false,
                message: err.response ? err.response.data.error || err.response.data.message : "Login: Internal server error",
            };
        }
    };
}

export default InstaloanxApi;
