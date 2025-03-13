import "./Admin.scss";
import AdminHistory from "../AdminHistory/AdminHistory";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useState, useEffect } from "react";

export default function Admin({isAuthenticated}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [activeLoan, setActiveLoan] = useState(null);
    const [loanData, setLoanData] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const {id} = await InstaloanxApi.getUserIdFromToken(); // Get the ID from the token
                // console.log(userId);
                if (!id) {
                    setError("User ID not found");
                    setLoading(false);
                    return;
                }

                // const response = await InstaloanxApi.login(newUser);
                // const response = await InstaloanxApi.getLoansByUserId(id); // gets user by id
                const respData = await InstaloanxApi.getUserIdFromToken(); // gets decoded user data
                const loanDatas = await InstaloanxApi.getAllLoans(); // gets all loans
                // console.log(response);
                // console.log(respData);
                // console.log(loanData);
                // console.log("response.data: ", response.data.data);
                // console.log( "respdata: ", respData);
                // response.success

                if (loanDatas.success) {

                // console.log(loanDatas.data.data);

                // sets loanData into state
                setLoanData(loanDatas.data.data);

                // Combine response.data.data and respData into a single object
                // const combinedData = {
                //     // ...response.data.data, // Spread loan data
                //     ...respData, // Spread user data
                // };

                // console.log(respData);

                setUser(respData);

                } else {
                    // setError(response.message); // Handle error
                    setError(respData.message); // Handle error
                    setError(loanData.message); // Handle error
                }
            } catch (err) {
                setError("Failed to fetch user dataaaa", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // useEffect(() => {
    //     const fetchActiveLoan = async () => {
    //         try {
    //             const { id } = await InstaloanxApi.getUserIdFromToken(); // Get the user ID
    //             if (!id) {
    //                 setError("User ID not found");
    //                 return;
    //             }

    //             const response = await InstaloanxApi.getLoansByUserId(id); // Fetch loans
    //             // console.log(response.data.data);
    //             if (response.success) {
    //                 // set loans
    //                 setLoans(response.data.data);
    //                 // console.log(response.data.data);

    //                 // Finds the active loan
    //                 const active = response.data.data.find(loan => loan.status === "Active");
    //                 setActiveLoan(active || null); // Set active loan or null if none
    //             } else {
    //                 setError(response.message);
    //             }
    //         } catch (err) {
    //             setError(`Failed to fetch active loan: ${err.message}`);
    //         }
    //     };

    //     fetchActiveLoan();
    // }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    // if (!loans) return <div>loading...</div>;


    return (
        // {/* The search query will take care of user name search as a criteria also so no need to create a different page for it */}
        // {/* search criteria query: first_name, last_name, email, all status(active, pending, fully paid, rejected) */}
        <article className="admin__box">
            <h1 className="admin__title">Hi {user.first_name},</h1>

            {/* loan history section */}
            <AdminHistory loanData={loanData} />
        </article>
    )
}