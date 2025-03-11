import "./Admin.scss";

export default function Admin() {
    return (
            
        // {/* The search query will take care of user name search as a criteria also so no need to create a different page for it */}
        // {/* search criteria query: first_name, last_name, email, all status(active, pending, fully paid, rejected) */}
        <article className="admin__box">
            <h1 className="admin__title">Hi Admin,</h1>

            {/* loan history section */}
            <section className="admin__history">
                <section className="admin__history-up">
                    <input className="admin__history-up-search" placeholder="Search..."/>
                </section>

                <section className="admin__history-head">
                    <p className="admin__history-head-text">S/N</p>
                    <p className="admin__history-head-text">AMOUNT</p>
                    <p className="admin__history-head-text">BORROWED</p>    
                    <p className="admin__history-head-text">PAID</p>    
                    <p className="admin__history-head-text">PURPOSE</p>    
                    <p className="admin__history-head-text">STATUS</p>
                </section>

                {/* A details page for each of the users to see full details e.g purpose and loan history */}
                <section>
                    <section className="admin__history-container">
                        <div className="admin__history-box">
                            <p className="admin__history-header">S/N</p>
                            <p className="admin__history-text">1</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">NAME</p>
                            <p className="admin__history-text">John Doe</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">AMOUNT</p>
                            <p className="admin__history-text">$35,000</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">BORROWED</p>
                            <p className="admin__history-text">01-12-2021</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">PAID</p>
                            <p className="admin__history-text">03-07-2021</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">STATUS</p>
                            <p className="admin__history-text">FULLY PAID</p>   
                        </div>
                    </section>
                    <section className="admin__history-container">
                        <div className="admin__history-box">
                            <p className="admin__history-header">S/N</p>
                            <p className="admin__history-text">2</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">AMOUNT</p>
                            <p className="admin__history-text">$35,000</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">BORROWED ON</p>
                            <p className="admin__history-text">01-12-2021</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">PAID ON</p>
                            <p className="admin__history-text">03-07-2021</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">PURPOSE</p>
                            <p className="admin__history-text">Education purpose</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">STATUS</p>
                            <p className="admin__history-text">FULLY PAID</p>   
                        </div>
                    </section>
                    <section className="admin__history-container">
                        <div className="admin__history-box">
                            <p className="admin__history-header">S/N</p>
                            <p className="admin__history-text">3</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">AMOUNT</p>
                            <p className="admin__history-text">$35,000</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">BORROWED ON</p>
                            <p className="admin__history-text">01-12-2021</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">PAID ON</p>
                            <p className="admin__history-text">03-07-2021</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">PURPOSE</p>
                            <p className="admin__history-text">Education purpose</p>   
                        </div>
                        <div className="admin__history-box">
                            <p className="admin__history-header">STATUS</p>
                            <p className="admin__history-text">FULLY PAID</p>   
                        </div>
                    </section>
                    {/* Add more sections - Make it a component during functionality*/}
                </section>
            </section>
        </article>
    )
}