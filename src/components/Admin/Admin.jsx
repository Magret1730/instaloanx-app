import "./Admin.scss";
import AdminHistory from "../AdminHistory/AdminHistory";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

export default function Admin() {
    const [adminId, setAdminId] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const {id} = useParams();
    const id = localStorage.getItem("id");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await InstaloanxApi.getUserById(id);

                if (response.success) {
                    setUser(response.data.data);
                    setAdminId(id);
                } else {
                    setError(response.message);
                }
            } catch (err) {
                console.error("Failed to fetch user data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);


    // Handles loading state
    if (loading) {
        return <Spinner loading={loading} />
    }

    if (error) return <div>Error: {error}</div>;


    return (
        <article className="admin__box">
            <h1 className="admin__title">Hi {user.first_name},</h1>

            {/* loan history section */}
            <AdminHistory adminId={adminId}/>
        </article>
    )
}