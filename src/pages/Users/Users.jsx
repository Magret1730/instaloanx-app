import "./Users.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Users() {
    return (
        <section className="users">
            <Header />

            <article className="users__box">
                <section className="users__box-header">
                    <section className="users__header"> {/* Same styling across views */}
                        <p className="users__header-header">Hi User,</p>
                        <button className="users__header-button">PAY LOAN</button>
                    </section>

                    <section className="users__active">
                        <p className="users__active-title">CURRENT LOAN</p>

                        <section className="users__active-head"> {/* Heading to be displayed for only mobile and desktop */}
                            <p className="users__active-headd">AMOUNT</p>    
                            <p className="users__active-headd">DATE BORROWED</p>    
                            <p className="users__active-headd">DATE PAID</p>    
                            <p className="users__active-headd">STATUS</p>    
                        </section> 

                        <section className="users__active-container">
                            <div className="users__active-box">
                                <p className="users__active-header">AMOUNT</p>
                                <p className="users__active-text">$50,000</p>
                            </div>
                            <div className="users__active-box">
                                <p className="users__active-header">DATE BORROWED</p>
                                <p className="users__active-text">05-03-2025</p>   
                            </div> 
                            <div className="users__active-box">
                                <p className="users__active-header">DATE PAID</p>
                                <p className="users__active-text">NOT YET</p>   
                            </div> 
                            <div className="users__active-box">
                                <p className="users__active-header">STATUS</p>
                                <p className="users__active-text">PENDING</p>   
                            </div>    
                        </section>
                    </section> {/* MAke column in mobile and rows in tablet/desktop. Heading for mobile view only */}
                </section>

                <section className="users__history">
                    <h3 className="users__history-title">LOAN HISTORY</h3>

                    <section className="users__history-head"> {/* Heading to be displayed for only mobile and desktop */}
                        <p className="users__history-head-text">NUM</p>
                        <p className="users__history-head-text">AMOUNT</p>    
                        <p className="users__history-head-text">BORROWED ON</p>    
                        <p className="users__history-head-text">PAID ON</p>    
                        <p className="users__history-head-text">STATUS</p>
                    </section>

                    <section className="users__history-container"> {/* MAke column in mobile and rows in tablet/desktop */}
                        <div className="users__history-box">
                            <p className="users__history-header">NUM</p>
                            <p className="users__history-text">1</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">AMOUNT</p>
                            <p className="users__history-text">$35,000</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">BORROWED ON</p>
                            <p className="users__history-text">01-12-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">PAID ON</p>
                            <p className="users__history-text">03-07-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">STATUS</p>
                            <p className="users__history-text">FULLY PAID</p>   
                        </div>
                    </section> 
                    <section className="users__history-container"> {/* MAke column in mobile and rows in tablet/desktop */}
                        <div className="users__history-box">
                            <p className="users__history-header">NUM</p>
                            <p className="users__history-text">1</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">AMOUNT</p>
                            <p className="users__history-text">$35,000</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">DATE BORROWED</p>
                            <p className="users__history-text">01-12-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">DATE PAID</p>
                            <p className="users__history-text">03-07-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">STATUS</p>
                            <p className="users__history-text">FULLY PAID</p>   
                        </div>
                    </section> 
                    <section className="users__history-container"> {/* MAke column in mobile and rows in tablet/desktop */}
                        <div className="users__history-box">
                            <p className="users__history-header">NUM</p>
                            <p className="users__history-text">1</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">AMOUNT</p>
                            <p className="users__history-text">$35,000</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">DATE BORROWED</p>
                            <p className="users__history-text">01-12-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">DATE PAID</p>
                            <p className="users__history-text">03-07-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">STATUS</p>
                            <p className="users__history-text">FULLY PAID</p>   
                        </div>
                    </section> 
                </section>
            </article>

            <Footer />
        </section>
    )
}