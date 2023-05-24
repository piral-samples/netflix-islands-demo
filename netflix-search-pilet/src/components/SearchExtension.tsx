import * as React from "react";
import useDismiss from "../hooks/useDismiss";
import { Search } from "./Search";
import { SearchResults } from "./SearchResults";
import { MovieTileProps } from "../models/proptypes";

interface SearchExtensionProps {
  api: any;
}

const SearchExtension: React.FC<SearchExtensionProps> = ({ api }) => {
  const [searchUrl, setSearchUrl] = React.useState("");
  const [resultsVisible, setResultsVisible] = React.useState(false);
  const wrapperRef = React.useRef(null);

  useDismiss(() => setResultsVisible(false), wrapperRef);

  const performSearch = React.useCallback((url: string) => {
    setSearchUrl(url);
    setResultsVisible(!!url);
  }, []);

  const MovieTile: React.FC<MovieTileProps> = (props) => (
    <api.Component name="MovieTile" params={props} />
  );

  return (
    <div ref={wrapperRef} className="search-container">
      <Search onSearchChange={performSearch} />
      {resultsVisible && (
        <SearchResults searchUrl={searchUrl} MovieTile={MovieTile} />
      )}
    </div>
  );
};

export default SearchExtension;
