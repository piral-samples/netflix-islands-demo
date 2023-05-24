import { AdapterRequestContext } from "@hattip/core";
import { createAsyncContext } from "./async";
import { SessionId, UserPiletContext } from "./types";

interface RequestContext {
  sessionId: string;
  context: UserPiletContext;
  request: Request;
}

export const asyncContext = createAsyncContext<RequestContext>();

export function initAsyncContext(
  sessionId: SessionId,
  piletContext: UserPiletContext,
  context: AdapterRequestContext
) {
  asyncContext.store({
    context: piletContext,
    sessionId: sessionId.value,
    request: context.request,
  });
}
