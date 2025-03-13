import { useNavigate } from "react-router-dom";
import "./ErrorPage.scss";

export default function ErrorPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/"); // Navigates to the home page
    };

    return (
        <section className="error-page">
            <div className="error-page__container">
                <h1 className="error-page__title">404 - Page Not Found</h1>
                <p className="error-page__message">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <button className="error-page__button" onClick={handleGoHome}>
                    Go Back Home
                </button>
            </div>
        </section>
    );
}
