function getStyleSheetBaseUrl(stylesheetUrl: string) {
  // Create a new URL object with the stylesheet URL
  const url = new URL(stylesheetUrl);

  // Remove the last segment of the path (i.e., the filename of the stylesheet)
  const pathSegments = url.pathname.split("/");
  pathSegments.pop();
  url.pathname = pathSegments.join("/");

  // Return the base URL as a string
  return url.toString();
}

export function normalizeCss(stylesheetUrl: string, cssText: string) {
  const baseUrl = getStyleSheetBaseUrl(stylesheetUrl);
  const regex = /url\(['"]?(?!data:|http[s]?:|\/\/)([^'")]+)['"]?\)/g;

  // Replace relative URLs with fully qualified URLs in the CSS text
  return cssText.replace(regex, `url("${baseUrl}/$1")`);
}
