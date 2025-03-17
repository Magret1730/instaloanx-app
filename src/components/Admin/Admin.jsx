import "./Admin.scss";
import AdminHistory from "../AdminHistory/AdminHistory";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Admin() {
    const [adminId, setAdminId] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {id} = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await InstaloanxApi.getUserById(id); // Calls the backend function

                if (response.success) {
                    setUser(response.data.data);
                    setAdminId(id);
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError("Failed to fetch user data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <article className="admin__box">
            <h1 className="admin__title">Hi {user.first_name},</h1>

            {/* loan history section */}
            <AdminHistory adminId={adminId}/>
        </article>
    )
}