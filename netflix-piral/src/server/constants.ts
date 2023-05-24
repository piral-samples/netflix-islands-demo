export const port = +process.env.PORT || 3000;
export const host = process.env.HOST || "localhost";
export const server = process.env.WEBSITE_URL
  ? `https://${process.env.WEBSITE_URL}`
  : `http://${host}:${port}`;
export const feedUrl =
  process.env.FEED_URL ||
  "https://feed.dev.piral.cloud/api/v1/pilet/islands-demo";
export const feedEvents =
  process.env.FEED_EVENTS ||
  "wss://feed.dev.piral.cloud/api/v1/pilet/islands-demo";
