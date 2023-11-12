import type { MfComponentProps } from "../server/types";

// otherwise we get TypeScript confused with Preact / React JSX definitions
const React = require("preact/compat");

const emptyHtml = { __html: "" };

export const Component: React.FC<MfComponentProps> = ({ name, params, rel }) => {
  return (
    <piral-slot
      name={name}
      rel={rel}
      group={`client-${Math.random().toString(26).substring(2)}`}
      params={JSON.stringify(params)}
      // this is a hack below; it ensures that React does not touch the SSR'ed part
      // which lets us hydrate these areas independently ...
      dangerouslySetInnerHTML={emptyHtml}
    />
  );
};
