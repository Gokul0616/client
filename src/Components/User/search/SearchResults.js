import React, { useState } from "react";
import Request from "../Request/request";
import "./SearchResults.css";

const SearchResults = ({ userId, searchResults, isDarkMode }) => {
  const [userDetails, setUserDetails] = useState(searchResults);
  // setUserDetails(searchResults);
  // console.log(searchResults);

  return (
    <div className={isDarkMode ? "search-results dark-mode" : "search-results"}>
      {/* <Request /> */}
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <Request userId={result.id} />
          ))}
        </ul>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default SearchResults;
