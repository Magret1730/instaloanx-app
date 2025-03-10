class InstaloanxApi {
    // Backend API base URL
    static BASE_URL = import.meta.env.VITE_BASE_URL;

    // Fetch all users
    static async getAllUsers() {
        try {
            const response = await fetch(`${this.BASE_URL}/users`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(err);
            return { success: false, message: "Internal server error" };
        }
    }

    // Fetch a single user by ID
    static async getUserById(id) {
        try {
            // Validate ID
            if (isNaN(id) || id <= 0) {
                return { success: false, message: "Invalid user ID" };
            }

            const response = await fetch(`${this.BASE_URL}/users/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return { success: false, message: "Internal server error" };
        }
    }

    // Fetch all loans
    static async getAllLoans() {
        try {
            const response = await fetch(`${this.BASE_URL}/loans`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(err);
            return { success: false, message: "Internal server error" };
        }
    }

    // Fetch a single loan by user_id
    static async getLoanById(id) {
        try {
            // Validates ID
            if (isNaN(id) || id <= 0) {
                return { success: false, message: "Invalid loan ID" };
            }

            const response = await fetch(`${this.BASE_URL}/loans/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return { success: false, message: "Internal server error" };
        }
    }
}

export default InstaloanxApi;
