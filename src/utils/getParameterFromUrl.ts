export const getParameterFromUrl = (
  url: string | null | undefined,
  paramName: string
): string | null => {
  if (!url) {
    return null;
  }
  try {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get(paramName);
  } catch {
    // If url is invalid, return null
    return null;
  }
};
