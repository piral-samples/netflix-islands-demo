import * as React from "react";
import { UserPiletContext } from "./types";

function getObj(previous: {}, [name, value]: [string, string]): any {
  previous[name] = value;
  return previous;
}

export function getFragment(name: string, url: URL, context: UserPiletContext) {
  if (name) {
    if (name.startsWith("page:")) {
      const path = name.substring(5);

      for (const reference of context.registry.pages.values()) {
        const result = reference.matcher(path);

        if (result) {
          const props = [...url.searchParams.entries()].reduce(
            getObj,
            result.params
          );

          return (
            <context.Component name={reference.component} params={props} />
          );
        }
      }
    } else {
      const props = [...url.searchParams.entries()].reduce(getObj, {});
      return <context.Component name={name} params={props} />;
    }
  }

  return null;
}
