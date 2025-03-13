import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutfn = () => {
            try {
                localStorage.removeItem("token");
                navigate("/");
            } catch (err) {
                console.error(err);
                
                return {
                    success: false,
                    message: err.response ? err.response.data.message : "Logout: Internal server error"
                };
            }
        }       

        logoutfn();
    }, []);
}