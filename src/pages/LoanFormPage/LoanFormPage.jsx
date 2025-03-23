import "./LoanFormPage.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LoanForm from "../../components/LoanForm/LoanForm";

export default function LoanFormPage() {
    return (
        <section>
            <Header />

            <LoanForm />

            <Footer />
        </section>
    )
}