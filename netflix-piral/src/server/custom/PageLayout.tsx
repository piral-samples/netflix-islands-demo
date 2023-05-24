import * as React from "react";
import cssText from "./style.scss";
import Logo from "./Logo";
import Footer from "./Footer";
import { UserPiletContext } from "../types";

interface PageLayoutProps {
  context: UserPiletContext;
  content: React.ReactNode;
  script: React.ReactNode;
  style: React.ReactNode;
}

function renderMenu(nodes: Array<React.ReactNode>) {
  return (
    <>
      {nodes.map((node, i) => (
        <li key={i}>{node}</li>
      ))}
    </>
  );
}

export default function ({ context, content, script, style }: PageLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="msapplication-TileColor" content="#212121" />
        <meta name="theme-color" content="#e6020c" />
        <title>Notflix Islands Demo</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <style dangerouslySetInnerHTML={{ __html: cssText }} />
        {style}
      </head>
      <body>
        <div id="app">
          <div className="main-wrapper">
            <header className="Header">
              <Logo />
              <div id="navigation" className="Navigation">
                <nav>
                  <ul>
                    <context.Component name="menu" render={renderMenu} />
                  </ul>
                </nav>
              </div>
              <context.Component name="header-items" />
            </header>
            {content}
          </div>
          <Footer />
        </div>
        {script}
      </body>
    </html>
  );
}
