export {};

declare global {
  interface Window {
    amplitude?: {
      init: (
        apiKey: string,
        userId?: string,
        options?: {
          fetchRemoteConfig?: boolean;
          autocapture?: boolean;
        }
      ) => void;
    };
    dataLayer?: Record<string, any>[];
  }
}
