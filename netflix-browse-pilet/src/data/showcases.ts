import { ShowCaseData } from "../models/types";

const data: Array<ShowCaseData> = [
  {
    title: "Top TV picks for you",
    url: "discover/tv?sort_by=popularity.desc&page=1",
    media_type: "tv",
  },
  {
    title: "Trending now",
    url: "discover/movie?sort_by=popularity.desc&page=1",
    media_type: "movie",
  },
  {
    title: "Most watched Horror",
    url: "genre/27/movies?sort_by=popularity.desc&page=1",
    media_type: "movie",
  },
  {
    title: "Sci-Fi greats",
    url: "genre/878/movies?sort_by=popularity.desc&page=1",
    media_type: "movie",
  },
  {
    title: "Comedy magic",
    url: "genre/35/movies?sort_by=popularity.desc&page=1",
    media_type: "movie",
  },
];

export default data;
