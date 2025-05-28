import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const WelcomePage = lazy(() => import("@/pages/Welcome"));
const TestPage = lazy(() => import("@/pages/Test.tsx"));
const Dashboard = lazy(() => import("IntegrityAgentDashboard/AgentDashboard"));
const Logout = lazy(() => import("@/auth/pages/Logout"));
const Register = lazy(() => import("@/auth/pages/RegistrationPage"));
const ForgotPasswordPage = lazy(
  () => import("@/auth/pages/ForgotPasswordPage")
);
const EmailUpdatePage = lazy(() => import("@/auth/pages/EmailUpdatedPage"));
const ContactSupport = lazy(() => import("@/auth/pages/ContactSupport"));
const ContactSupportInvalidNPN = lazy(
  () => import("@/auth/pages/ContactSupportInvalidNPN")
);
const ServerErrorPage = lazy(() => import("@/auth/pages/ServerErrorPage"));
const FinalErrorPage = lazy(() => import("@/auth/pages/FinalErrorPage"));
const UpdateMobileApp = lazy(() => import("@/auth/pages/UpdateMobileApp"));
const RegistrationConfirmEmailPage = lazy(
  () => import("@/auth/pages/RegistrationConfirmEmailPage")
);
const RegistrationCheckEmailPage = lazy(
  () => import("@/auth/pages/RegistrationCheckEmailPage")
);
const RegistrationConfirmLinkExpiredPage = lazy(
  () => import("@/auth/pages/RegistrationConfirmLinkExpiredPage")
);
const RegistrationCompletedPage = lazy(
  () => import("@/auth/pages/RegistrationCompletedPage")
);
const ForgotPasswordSentPage = lazy(
  () => import("@/auth/pages/ForgotPasswordSentPage")
);
const PasswordResetExpiredPage = lazy(
  () => import("@/auth/pages/PasswordLinkExpiredPage")
);
const PasswordUpdatePage = lazy(
  () => import("@/auth/pages/PasswordUpdatedPage")
);
const PasswordResetPage = lazy(() => import("@/auth/pages/PasswordResetPage"));
const NewEmailPage = lazy(() => import("@/auth/pages/NewEmailPage"));

const AppRoutes: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {/* Unauthenticated Routes */}
      <Route path="/" element={<Register />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/test" element={<TestPage />} />

      {/* Private Routes */}

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/contact-support" element={<ContactSupport />} />
      <Route path="/email-updated" element={<EmailUpdatePage />} />
      <Route
        path="/contact-support-invalid-npn/:npnId"
        element={<ContactSupportInvalidNPN />}
      />
      <Route path="/sorry" element={<FinalErrorPage />} />
      <Route path="/server-error" element={<ServerErrorPage />} />
      <Route path="/update-mobile-app" element={<UpdateMobileApp />} />
      <Route path="/confirm-email" element={<RegistrationConfirmEmailPage />} />
      <Route
        path="/registration-check-email"
        element={<RegistrationCheckEmailPage />}
      />
      <Route
        path="/confirm-link-expired"
        element={<RegistrationConfirmLinkExpiredPage />}
      />
      <Route
        path="/registration-complete"
        element={<RegistrationCompletedPage />}
      />
      <Route
        path="/forgot-password-sent"
        element={<ForgotPasswordSentPage />}
      />
      <Route
        path="/password-reset-expired"
        element={<PasswordResetExpiredPage />}
      />
      <Route path="/password-updated" element={<PasswordUpdatePage />} />
      <Route path="/password-reset" element={<PasswordResetPage />} />
      <Route path="/new-email" element={<NewEmailPage />} />

      <Route path="/dashboard" element={<Dashboard />} />

      {/* Redirect unmatched paths to Register */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
