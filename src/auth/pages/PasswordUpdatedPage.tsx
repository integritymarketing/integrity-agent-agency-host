import React from "react";

import BaseConfirmationPage from "./BaseConfirmationPage";

const PasswordUpdatePage: React.FC = () => {
  return (
    <>
      <BaseConfirmationPage
        title="You’re all set"
        body="The password for your account has been updated."
      />
    </>
  );
};

export default PasswordUpdatePage;
