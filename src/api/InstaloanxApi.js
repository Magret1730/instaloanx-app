import axios from "axios";
import {jwtDecode} from "jwt-decode";

class InstaloanxApi {
    // Backend API base URL
    static BASE_URL = import.meta.env.VITE_BASE_URL;

    // Register user
    static async register(newUser) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/register`, newUser);
            // console.log(response.data.data);
            if (response.status !== 201) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // sets token to local storage
            localStorage.setItem("token", response.data.data);

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
            // console.log(response.data);
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // sets token to local storage
            localStorage.setItem("token", response.data.token);

            // Return the response data
            return { success: true, data: response.data };
            // }
        } catch (err) {
            console.error("Login error", err);

            return {
                success: false,
                message: err.response ? err.response.data.error || err.response.data.message : "Login: Internal server error",
            };
        }
    }

    // Fetch all users
    static async getAllUsers() {
        try {
            const response = await axios.get(`${this.BASE_URL}/users`);
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

            // console.log("ID from instaloanapi.js", id);

            // Gets the token from localStorage 
            const token = localStorage.getItem("token");
            // console.log("token from instaloanapi.js", token);
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
            const response = await axios.get(`${this.BASE_URL}/loans`);
            if (!response.ok) {
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
    static async getLoansByUserId(id) {
        try {
            // Validates ID
            if (isNaN(id) || id <= 0) {
                return { success: false, message: "Invalid loan ID" };
            }

            // Gets the token from localStorage 
            const token = localStorage.getItem("token");
            // console.log("token from instaloanapi.js line 155", token);
            if (!token) {
                return { success: false, message: "No token found" };
            }

            const response = await axios.get(`${this.BASE_URL}/users/${id}/loans`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log("token from instaloanapi.js line 165", response);
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

    // Function to get the user ID from the token
    static async getUserIdFromToken() {
        try {
        const token = localStorage.getItem("token");
        // console.log(token);

        if (!token) {
            return null;
        }

        const decoded = jwtDecode(token);
        // console.log(decoded);
        // console.log(decoded.id);
        return decoded; // Assuming the ID is stored in the token as `userId`
        } catch (err) {
            console.error(err);
            
            return {
                success: false,
                message: err.response ? err.response.data.message : "getUserIdFromToken: Internal server error"
            };
        }
    }

    // // Function to check isAdmin
    // static async isAdminFunc() {
    //     try {
    //         const token = localStorage.getItem("token");
    //     // console.log(token);

    //     if (!token) {
    //         return null;
    //     }

    //     const decoded = jwtDecode(token);

    //     return decoded.is_admin === true; // Checks if the user is an admin

    //     } catch (err) {
    //         console.error(err);
            
    //         return {
    //             success: false,
    //             message: err.response ? err.response.data.message : "isAdminFunc: Internal server error"
    //         };
    //     }
    // }
}

export default InstaloanxApi;
