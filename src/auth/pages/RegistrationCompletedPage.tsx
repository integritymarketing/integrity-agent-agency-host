import React from "react";
import BaseConfirmationPage from "pages/auth/BaseConfirmationPage";

const RegistrationCompletedPage: React.FC = () => {
  return (
    <BaseConfirmationPage
      title="You’re all set"
      body="Your account registration has been completed."
    />
  );
};

export default RegistrationCompletedPage;
