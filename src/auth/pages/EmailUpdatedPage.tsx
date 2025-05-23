import React from "react";
import BaseConfirmationPage from "./BaseConfirmationPage";

const EmailUpdatePage: React.FC = () => {
  return (
    <BaseConfirmationPage
      title="You’re all set"
      body="The email address for your account has been updated."
    />
  );
};

export default EmailUpdatePage;
