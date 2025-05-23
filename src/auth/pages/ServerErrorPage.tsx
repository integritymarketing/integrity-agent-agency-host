import { useEffect } from "react";
import BaseConfirmationPage from "pages/auth/BaseConfirmationPage";
import useQueryParams from "@/hooks/useQueryParams";
import useFetch from "hooks/useFetch";

const ServerErrorPage: React.FC = () => {
  const { Put: getServerError, response } = useFetch(
    `${import.meta.env.VITE_AUTH_AUTHORITY_URL}/error`
  );
  const params = useQueryParams();

  // useEffect dependency array was misplaced
  useEffect(() => {
    const fetchError = async () => {
      try {
        const errorId = params.get("errorId");
        await getServerError.put(`?errorId=${errorId}`);
        // response.text() may be async, so await it
        const errorText = await response.text();
        // Throw error so it can be caught by ErrorBoundary or logged
        throw new Error(errorText);
      } catch (error) {
        // Optional: handle or log error here if needed
        console.error("Server error fetch failed:", error);
      }
    };

    fetchError();
  }, [getServerError, params, response]);

  return (
    <BaseConfirmationPage
      title="We’re sorry"
      body="An internal server error occurred. We are looking into the problem, please try again later."
      button=""
    />
  );
};

export default ServerErrorPage;
