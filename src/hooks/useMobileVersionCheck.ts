import useDeviceInfo, { DEVICES } from "./useDeviceInfo";
import useQueryParams from "./useQueryParams";

const IOS_MINIMUM_APP_VERSION = import.meta.env
  .VITE_IOS_MINIMUM_APP_VERSION as string;
const ANDROID_MINIMUM_APP_VERSION = import.meta.env
  .VITE_ANDROID_MINIMUM_APP_VERSION as string;

/**
 * Get URL parameter value by name from a URLSearchParams or string.
 */
function getURLParameter(
  name: string,
  url: string | URLSearchParams
): string | null {
  const urlParams =
    url instanceof URLSearchParams ? url : new URLSearchParams(url);
  return urlParams.get(name);
}

/**
 * Compares two version strings and returns true if version < targetVersion.
 * Versions like "1.2.3(123)" will have the trailing parentheses number removed before comparing.
 */
function isAppVersionOlderThan(
  version: string,
  targetVersion: string
): boolean {
  version = version.replace(/\(\d+\)$/, "");
  targetVersion = targetVersion.replace(/\(\d+\)$/, "");

  const versionParts = version.split(".").map(Number);
  const targetVersionParts = targetVersion.split(".").map(Number);

  for (
    let i = 0;
    i < Math.min(versionParts.length, targetVersionParts.length);
    i++
  ) {
    if (versionParts[i] < targetVersionParts[i]) {
      return true; // version is older
    }
    if (versionParts[i] > targetVersionParts[i]) {
      return false; // version is newer
    }
  }

  return versionParts.length < targetVersionParts.length;
}

/**
 * React hook to check if mobile app version from query params is older than minimum supported version.
 * Returns true if version is older or missing, false if version is valid and up-to-date.
 */
const useMobileVersionCheck = (): boolean => {
  const device = useDeviceInfo();
  const params = useQueryParams();

  // Defensive: params.get("ReturnUrl") may be null or invalid URL
  const returnUrlParam = params.get("ReturnUrl");

  if (!returnUrlParam) {
    // No ReturnUrl param, assume version is outdated or cannot check
    return true;
  }

  let versionParam: string | null = null;

  try {
    // Construct URL object to extract query parameters
    const url = new URL(returnUrlParam, window.location.origin);
    versionParam = getURLParameter("Version", url.search);
  } catch {
    // Invalid URL - treat as no version param
    versionParam = null;
  }

  if (versionParam) {
    const minVersion =
      device === DEVICES.IOS || device === DEVICES.IPHONE
        ? IOS_MINIMUM_APP_VERSION
        : ANDROID_MINIMUM_APP_VERSION;

    return isAppVersionOlderThan(versionParam, minVersion);
  }

  return true;
};

export default useMobileVersionCheck;
