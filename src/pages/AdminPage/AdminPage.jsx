import "./AdminPage.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Admin from "../../components/Admin/Admin";

export default function AdminPage() {
    return (
        <section className="admin-page">
            <Header />
            <Admin />
            <Footer />
        </section>
    )
}