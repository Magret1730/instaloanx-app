import "./ErrorMessage.scss";
// import ErrorIcon from "../../assets/icons/error-24px.svg"

const ErrorMessage = ({ messageError, errorMessage }) => {
    return (
        <>
            {/* // Create another dstyling for errorMessage (this handles backend error) */}
            {(messageError || errorMessage) && (
                <p className="error-message">
                    {messageError || errorMessage}
                </p>
            )}
        </>
    );
};

export default ErrorMessage;
