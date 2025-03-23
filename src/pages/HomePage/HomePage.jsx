import "./HomePage.scss";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import Research from "../../components/Research/Research";
import Choose from "../../components/Choose/Choose";

export default function Home({isAuthenticated}) {

    return (
        <section>
            <Header />
            <Hero  isAuthenticated={isAuthenticated}/>
            <Research />
            <Choose />
            <Footer />
        </section>
    )
}