import { parse, CookieParseOptions, serialize } from "cookie";
import { v4 } from "uuid";
import { SessionId } from "./types";

export function parseCookie(cookie: string, options?: CookieParseOptions) {
  return parse(cookie || "", options);
}

export function createSessionCookie(sid: string) {
  return serialize("sid", sid, {
    path: '/',
  });
}

export function parseSessionId(cookie: string): string | undefined {
  const value = parseCookie(cookie);
  return value.sid;
}

export function getSessionId(cookie: string): SessionId {
  const sid = parseSessionId(cookie);

  if (!sid) {
    return {
      renew: true,
      value: v4(),
    };
  }

  return {
    renew: false,
    value: sid,
  };
}
