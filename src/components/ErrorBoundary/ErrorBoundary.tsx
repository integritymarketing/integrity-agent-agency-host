import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
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
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return (
        fallback || (
          <div style={{ padding: 20, textAlign: "center" }}>
            <h2>Something went wrong.</h2>
            {error && (
              <div style={{ textAlign: "left", marginTop: 20 }}>
                <h3>Error Details:</h3>
                <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
                  {error.message}
                </pre>
                <pre style={{ color: "gray", whiteSpace: "pre-wrap" }}>
                  {error.stack}
                </pre>
              </div>
            )}
            <p>Please try refreshing the page or contact support.</p>
            <p>{JSON.stringify(this.state.error)}</p>
          </div>
        )
      );
    }

    return children;
  }
}

export default ErrorBoundary;