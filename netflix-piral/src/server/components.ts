import { PiletMetadata } from "piral-base";
import { events } from "./events";
import { createNewContext, reloadContext } from "./context";
import { StateContext, PiletContext, UserPiletContext } from "./types";

const globalCache = new Map<string, PiletContext>();
const userCache = new Map<string, StateContext>();

events.on("pilet-changed", (pilet: PiletMetadata) => {
  globalCache.clear();
});

export async function loadPilets(sessionId: string): Promise<UserPiletContext> {
  const stateContext = userCache.get(sessionId);

  if (!stateContext) {
    const newContext = await createNewContext();
    userCache.set(sessionId, {
      Component: newContext.Component,
      piletsRef: sessionId,
      registry: newContext.registry,
    });

    if (!globalCache.has(sessionId)) {
      globalCache.set(sessionId, {
        cssContent: newContext.cssContent,
        cssLinks: newContext.cssLinks,
        dependencies: newContext.dependencies,
        jsContent: newContext.jsContent,
        jsLinks: newContext.jsLinks,
        pilets: newContext.pilets,
      });
    }

    return newContext;
  } else if (!globalCache.has(stateContext.piletsRef)) {
    const newContext = await reloadContext(stateContext);
    
    userCache.set(sessionId, {
      Component: newContext.Component,
      piletsRef: sessionId,
      registry: newContext.registry,
    });

    globalCache.set(stateContext.piletsRef, {
      cssContent: newContext.cssContent,
      cssLinks: newContext.cssLinks,
      dependencies: newContext.dependencies,
      jsContent: newContext.jsContent,
      jsLinks: newContext.jsLinks,
      pilets: newContext.pilets,
    });

    return newContext;
  }

  return {
    ...stateContext,
    ...globalCache.get(stateContext.piletsRef),
  };
}
