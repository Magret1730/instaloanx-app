import "./Admin.scss";
import AdminHistory from "../AdminHistory/AdminHistory";

export default function Admin() {
    return (
        // {/* The search query will take care of user name search as a criteria also so no need to create a different page for it */}
        // {/* search criteria query: first_name, last_name, email, all status(active, pending, fully paid, rejected) */}
        <article className="admin__box">
            <h1 className="admin__title">Hi Admin,</h1>

            {/* loan history section */}
            <AdminHistory />
        </article>
    )
}