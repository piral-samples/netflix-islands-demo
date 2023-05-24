import * as React from "react";
import PageLayout from "./custom/PageLayout";
import { UserPiletContext } from "./types";

interface LayoutProps {
  children: React.ReactNode;
  context: UserPiletContext;
}

const style = `
piral-component, piral-slot {
  display: contents;
}
`;

export const Layout: React.FC<LayoutProps> = ({ children, context }) => (
  <PageLayout
    context={context}
    content={children}
    style={
      <>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <style dangerouslySetInnerHTML={{ __html: context.cssContent }} />
      </>
    }
    script={<script dangerouslySetInnerHTML={{ __html: context.jsContent }} />}
  />
);
