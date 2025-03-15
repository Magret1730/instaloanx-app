import "./Admin.scss";
import AdminHistory from "../AdminHistory/AdminHistory";
import InstaloanxApi from "../../api/InstaloanxApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Admin({isAuthenticated}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [activeLoan, setActiveLoan] = useState(null);
    // const [loanData, setLoanData] = useState(null);

    const {id} = useParams();
    // console.log(id);


    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             // const {id} = await InstaloanxApi.getUserIdFromToken(); // Get the ID from the token
    //             // // console.log(userId);
    //             // if (!id) {
    //             //     setError("User ID not found");
    //             //     setLoading(false);
    //             //     return;
    //             // }

    //             // const response = await InstaloanxApi.login(newUser);
    //             // const response = await InstaloanxApi.getLoansByUserId(id); // gets user by id
    //             // const respData = await InstaloanxApi.getUserIdFromToken(); // gets decoded user data
    //             // const loanDatas = await InstaloanxApi.getAllLoans(); // gets all loans
    //             // console.log(response);
    //             // console.log(respData);
    //             // console.log(loanDatas);
    //             // console.log("response.data: ", response.data.data);
    //             // console.log( "respdata: ", respData);
    //             // response.success



    //             if (loanDatas.success) {

    //                 // console.log(loanDatas.data.data);

    //                 // sets loanData into state
    //                 setLoanData(loanDatas.data.data);

    //                 // Combine response.data.data and respData into a single object
    //                 // const combinedData = {
    //                 //     // ...response.data.data, // Spread loan data
    //                 //     ...respData, // Spread user data
    //                 // };

    //                 // console.log(respData);

    //                 setUser(respData);

    //             } else {
    //                 // setError(response.message); // Handle error
    //                 setError(respData.message); // Handle error
    //                 setError(loanData.message); // Handle error
    //             }
    //         } catch (err) {
    //             setError("Failed to fetch user dataaaa", err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchUser();
    // }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await InstaloanxApi.getUserById(id); // Calls the backend function
                // console.log(response);

                if (response.success) {
                    setUser(response.data.data);
                    // setLoanData(response.data.data.loans);

                    // Find active loan
                    // const active = response.data.data.loans.find(loan => loan.status === "Active");
                    // setActiveLoan(active || null);
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError("Failed to fetch user data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    // if (!loans) return <div>loading...</div>;


    return (
        // {/* The search query will take care of user name search as a criteria also so no need to create a different page for it */}
        // {/* search criteria query: first_name, last_name, email, all status(active, pending, fully paid, rejected) */}
        <article className="admin__box">
            <h1 className="admin__title">Hi {user.first_name},</h1>

            {/* loan history section */}
            <AdminHistory />
        </article>
    )
}