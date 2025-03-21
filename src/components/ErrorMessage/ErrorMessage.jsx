import "./ErrorMessage.scss";

const ErrorMessage = ({ messageError, errorMessage }) => {
    return (
        <>
            {(messageError || errorMessage) && (
                <p className="error-message">
                    {messageError || errorMessage}
                </p>
            )}
        </>
    );
};

export default ErrorMessage;
