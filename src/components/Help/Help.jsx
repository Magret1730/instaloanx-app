import "./Help.scss";

export default function Help() {
    return (
        <div className="help">
            <h1 className="help-header">InstaloanX Help Center</h1>
            <p className="help-text">If you're having trouble, here are some resources to assist you:</p>

            <h2 className="help-title">Frequently Asked Questions (FAQs)</h2>

            {/* <div className="help-faq">
                <h3 className="help-faq__title">How do I reset my password?</h3>
                <p className="help-faq__text">To reset your password, click on the 'Forgot Password' link on the login page, and follow the instructions.</p>
            </div> */}

            {/* <div className="help-faq">
                <h3 className="help-faq__title">How do I update my profile information?</h3>
                <p className="help-faq__text">You can update your profile information by visiting your account settings page.</p>
            </div> */}

            <div className="help-faq">
                <h3 className="help-faq__title">How do I apply for a loan?</h3>
                <p className="help-faq__text">To apply for a loan, follow these steps:</p>
                <ul className="help-faq__links">
                    <li className="help-faq__link">Register or log in to your account.</li>
                    <li className="help-faq__link">Once logged in, navigate to the loan application section and submit your application.</li>
                    <li className="help-faq__link">Your application will be reviewed by our admin team.</li>
                    <li className="help-faq__link">If your request is approved, you will receive the loan within 3-5 business days.</li>
                </ul>
            </div>

            <div className="help-faq">
                <h3 className="help-faq__title">What happens if my loan request is rejected?</h3>
                {/* <p className="help-faq__text">If your loan request is rejected, you will receive a notification explaining the reason. You can then make necessary adjustments and reapply in the future.</p> */}
                <p className="help-faq__text">If your loan request is rejected, you can always reapply.</p>
            </div>

            <div className="help-faq">
                <h3 className="help-faq__title">How long does it take for my loan to be approved?</h3>
                <p className="help-faq__text">Loan approval typically takes 1-2 business days, depending on the volume of requests. Once approved, the funds will be disbursed to your account within 3-5 business days.</p>
            </div>

            <div className="help-faq">
                <h3 className="help-faq__title">What should I do if I encounter a problem with my loan application?</h3>
                <p className="help-faq__text">If you encounter any issues during the loan application process, please contact our support team at <a className="help-faq__text-link" href="mailto:support@instaloanx.com">support@instaloanx.com</a> for assistance.</p>
            </div>

            <div className="help-faq">
                <h3 className="help-faq__title">Can I apply for multiple loans at once?</h3>
                <p className="help-faq__text">At the moment, you can only have one active loan application. If you wish to apply for a new loan, please repay your current loan before submitting a new application.</p>
            </div>

            <div className="help-faq">
                <h3 className="help-faq__title">Is my personal information secure?</h3>
                <p className="help-faq__text">Yes, we take your privacy seriously. All your personal information is encrypted and stored securely to protect your data from unauthorized access.</p>
            </div>

            <div className="help-faq">
                <h3 className="help-faq__title">How do I contact support?</h3>
                <p className="help-faq__text">If you need assistance, you can reach out to our support team via email at <a className="help-faq__text-link" href="mailto:support@instaloanx.com">support@instaloanx.com</a> or through our live chat feature on the app.</p>
            </div>
        </div>
    );
}
