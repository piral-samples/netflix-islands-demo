import * as React from "react";
import { renderToStream } from "react-streaming/server";
import { renderToReadableStream } from "react-dom/server.browser";
import { RenderContext, createController } from "./RenderContext";
import { Layout } from "./Layout";
import { serializePartialState, serializeState } from "./state";
import { UserPiletContext } from "./types";

interface StateResumationProps {
  type: "full" | "partial";
}

const StateResumation: React.FC<StateResumationProps> = ({ type }) => {
  const { Summary } = React.useContext(RenderContext);

  return (
    <Summary>
      {(context, usedComponents) => (
        <script
          type="piral-state"
          dangerouslySetInnerHTML={{
            __html:
              type === "full"
                ? serializeState(context, usedComponents)
                : serializePartialState(usedComponents),
          }}
        />
      )}
    </Summary>
  );
};

async function render(content: React.ReactNode, userAgent: string) {
  const { readable } = await renderToStream(content, {
    webStream: true,
    userAgent,
    renderToReadableStream,
  });

  return readable;
}

export function renderFragment(
  content: React.ReactNode,
  userAgent: string,
  context: UserPiletContext
) {
  const controller = createController(context);
  return render(
    <RenderContext.Provider value={controller}>
      {content}
      <StateResumation type="partial" />
    </RenderContext.Provider>,
    userAgent
  );
}

export function renderLayout(
  content: React.ReactNode,
  userAgent: string,
  context: UserPiletContext
) {
  const controller = createController(context);
  return render(
    <RenderContext.Provider value={controller}>
      <Layout context={context}>
        {content}
        <StateResumation type="full" />
      </Layout>
    </RenderContext.Provider>,
    userAgent
  );
}
