import "./Users.scss";
import UsersHistory from "../UsersHistory/UsersHistory";

export default function Users() {
    return (
        <article className="users__box">
            <section className="users__box-header">
                <section className="users__header">
                    <p className="users__header-header">Hi User,</p>
                    <button className="users__header-button">PAY LOAN</button>
                </section>

                {/* active loan section */}
                <section className="users__active">
                    <p className="users__active-title">CURRENT LOAN</p>

                    <section className="users__active-head">
                        <p className="users__active-headd">AMOUNT</p>    
                        <p className="users__active-headd">BORROWED</p>    
                        <p className="users__active-headd">PAID</p>    
                        <p className="users__active-headd">STATUS</p>    
                    </section> 

                    <section className="users__active-container">
                        <div className="users__active-box">
                            <p className="users__active-header">AMOUNT</p>
                            <p className="users__active-text">$50,000</p>
                        </div>
                        <div className="users__active-box">
                            <p className="users__active-header">BORROWED</p>
                            <p className="users__active-text">05-03-2025</p>   
                        </div> 
                        <div className="users__active-box">
                            <p className="users__active-header">PAID</p>
                            <p className="users__active-text">NOT YET</p>   
                        </div> 
                        <div className="users__active-box">
                            <p className="users__active-header">STATUS</p>
                            <p className="users__active-text">PENDING</p>   
                        </div>    
                    </section>
                </section>
            </section>

            {/* users history */}
            <section className="users__history">
                <h3 className="users__history-title">LOAN HISTORY</h3>

                <section className="users__history-head">
                    <p className="users__history-head-text">NUM</p>
                    <p className="users__history-head-text">AMOUNT</p>    
                    <p className="users__history-head-text">BORROWED</p>    
                    <p className="users__history-head-text">PAID</p>    
                    <p className="users__history-head-text">STATUS</p>
                </section>

                <section>
                    <section className="users__history-container">
                        <div className="users__history-box">
                            <p className="users__history-header">NUM</p>
                            <p className="users__history-text">1</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">AMOUNT</p>
                            <p className="users__history-text">$35,000</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">BORROWED</p>
                            <p className="users__history-text">01-12-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">PAID</p>
                            <p className="users__history-text">03-07-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">STATUS</p>
                            <p className="users__history-text">FULLY PAID</p>   
                        </div>
                    </section> 
                    <section className="users__history-container"> 
                        <div className="users__history-box">
                            <p className="users__history-header">NUM</p>
                            <p className="users__history-text">1</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">AMOUNT</p>
                            <p className="users__history-text">$35,000</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">BORROWED</p>
                            <p className="users__history-text">01-12-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">PAID</p>
                            <p className="users__history-text">03-07-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">STATUS</p>
                            <p className="users__history-text">FULLY PAID</p>   
                        </div>
                    </section> 
                    <section className="users__history-container">
                        <div className="users__history-box">
                            <p className="users__history-header">NUM</p>
                            <p className="users__history-text">1</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">AMOUNT</p>
                            <p className="users__history-text">$35,000</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">BORROWED</p>
                            <p className="users__history-text">01-12-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">PAID</p>
                            <p className="users__history-text">03-07-2021</p>   
                        </div>
                        <div className="users__history-box">
                            <p className="users__history-header">STATUS</p>
                            <p className="users__history-text">FULLY PAID</p>   
                        </div>
                    </section>
                </section>
            </section>
            <UsersHistory />
        </article>
    )
}