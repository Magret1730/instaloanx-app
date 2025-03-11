import "./UsersPage.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Users from "../../components/Users/Users";

export default function UsersPage() {
    return (
        <section className="users-page">
            <Header />
            <Users />
            <Footer />
        </section>
    )
}