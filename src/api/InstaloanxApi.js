import axios from "axios";

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
            console.log(response);
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

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

            const response = await axios.get(`${this.BASE_URL}/users/${id}`);
            if (!response.ok) {
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

    // Fetch a single loan by user_id
    static async getLoanById(id) {
        try {
            // Validates ID
            if (isNaN(id) || id <= 0) {
                return { success: false, message: "Invalid loan ID" };
            }

            const response = await axios.get(`${this.BASE_URL}/loans/${id}`);
            if (!response.ok) {
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
}

export default InstaloanxApi;
