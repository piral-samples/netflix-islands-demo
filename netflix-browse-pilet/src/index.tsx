import "./style.scss";

import showcasesdata from "./data/showcases";
import herodata from "./data/hero";
import { ShowCaseData } from "./models/types";

const apiKey = "87dfa1c669eea853da609d4968d294be";

const cache = {};

function loadContent(showcase: ShowCaseData) {
  const url = `https://api.themoviedb.org/3/${showcase.url}&api_key=${apiKey}`;

  if (url in cache) {
    return Promise.resolve(cache[url]);
  }

  return fetch(url)
    .then((res) => res.json())
    .then((data) => ({
      titles: data.results.slice(0, 5),
      heading: showcase.title,
      media_type: showcase.media_type,
    }))
    .then((result) => {
      cache[url] = result;
      return result;
    });
}

export function setup(app: any) {
  app.registerComponent("menu", () => import("./components/Menu"), {
    client: "none",
  });

  app.registerPage("/browse", () => import("./components/Browse"), {
    client: "none",
    data: {
      hero: () => Promise.resolve(herodata),
      showcases: () => Promise.all(showcasesdata.map(loadContent)),
    },
  });
}
