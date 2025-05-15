import { useCallback } from "react";

/**
 * Details object for analytics events, can be any key-value pairs.
 */
type AnalyticsDetails = Record<string, unknown>;

/**
 * Custom hook for analytics functionalities.
 *
 * @returns {object} An object containing methods for analytics.
 */
const useAnalytics = () => {
  /**
   * Returns a CSS class string prefixed with 'gtm-' for a given id.
   * @param {string} id - Identifier to generate the class.
   * @returns {string} Generated class string.
   */
  const clickClass = useCallback((id: string): string => {
    return `gtm-${id}`;
  }, []);

  /**
   * Pushes an event with details into the `window.dataLayer` if available.
   * @param {string} event - Event name.
   * @param {AnalyticsDetails} [details={}] - Additional event details.
   */
  const fireEvent = useCallback(
    (event: string, details: AnalyticsDetails = {}) => {
      if (
        typeof window !== "undefined" &&
        Array.isArray((window as any).dataLayer)
      ) {
        (window as any).dataLayer.push({
          event,
          ...details,
        });
      }
    },
    []
  );

  return {
    clickClass,
    fireEvent,
  };
};

export default useAnalytics;
