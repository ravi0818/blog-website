import React from "react";
import PostCard from "./PostCard";

const SearchResult = ({ data }) => {
  return (
    <div>
      <div className="py-6">
        <p className="text-3xl">Search Result</p>
        {data.length === 0 && <div className="py-4">No result found...</div>}
        <div className="grid lg:grid-cols-3 gap-4">
          {data.map((post, index) => {
            return <PostCard post={post} summary={true} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
