import "./SuccessMessage.scss";
// import ErrorIcon from "../../assets/icons/error-24px.svg"

const SuccessMessage = ({ successMessage }) => {
    return (
        <>
            {successMessage && (
                <p className="success">
                    {/* <img src={Icon} alt="" className="success__icon" /> */}
                    {successMessage}
                </p>
            )}
        </>
    );
};

export default SuccessMessage;