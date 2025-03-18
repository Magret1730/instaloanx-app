import "./SuccessMessage.scss";

const SuccessMessage = ({ successMessage }) => {
    return (
        <>
            {successMessage && (
                <p className="success">
                    {successMessage}
                </p>
            )}
        </>
    );
};

export default SuccessMessage;