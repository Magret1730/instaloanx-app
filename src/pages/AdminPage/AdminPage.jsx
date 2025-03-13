import "./AdminPage.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Admin from "../../components/Admin/Admin";

export default function AdminPage({isAuthenticated}) {
    return (
        <section className="admin-page">
            <Header />
            <Admin isAuthenticated={isAuthenticated}/>
            <Footer />
        </section>
    )
}