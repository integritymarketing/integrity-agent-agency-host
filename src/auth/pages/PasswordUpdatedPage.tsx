import React from "react";
import { Helmet } from "react-helmet-async";

import BaseConfirmationPage from "auth/pages/BaseConfirmationPage";

const PasswordUpdatePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Integrity - Reset Password</title>
      </Helmet>
      <BaseConfirmationPage
        title="You’re all set"
        body="The password for your account has been updated."
      />
    </>
  );
};

export default PasswordUpdatePage;
