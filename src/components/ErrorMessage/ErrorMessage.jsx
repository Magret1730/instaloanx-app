import "./ErrorMessage.scss";

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
