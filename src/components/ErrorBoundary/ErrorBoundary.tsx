import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to display fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // You can log error info to an error reporting service here
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      // Render fallback UI if provided or default message
      return (
        fallback || (
          <div style={{ padding: 20, textAlign: "center" }}>
            <h2>Something went wrong.</h2>
            <p>Please try refreshing the page or contact support.</p>
          </div>
        )
      );
    }

    return children;
  }
}

export default ErrorBoundary;
