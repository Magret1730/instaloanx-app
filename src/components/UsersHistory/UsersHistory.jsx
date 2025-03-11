import "./UsersHistory.scss";

export default function UsersHistory() {
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
            {/* Make each history-container a component during functionality */}
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
}