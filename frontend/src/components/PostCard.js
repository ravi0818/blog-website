import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import imagePlaceholder from "../utils/placeholder-image.jpg";

const PostCard = ({ post, summary }) => {
  const getDate = (date) => {
    return new Date(date).toDateString().slice(4);
  };
  return (
    <div className="flex flex-col p-5 shadow h-full justify-between">
      <div className="">
        <img
          className="pb-5 object-cover h-60 w-full"
          src={post.coverImage || imagePlaceholder}
          onError={(e) => (e.target.src = imagePlaceholder)}
        ></img>
        <Link className="bg-blue-400 text-white rounded text-sm p-1">
          &nbsp;{post.category}&nbsp;
        </Link>

        <Link to={`posts/${post._id}`}>
          <div className="">
            <p className="text-xl font-bold py-2">{post.title}</p>
            {summary && <p className="text-gray-500">{post.summary}</p>}
          </div>
        </Link>
      </div>
      <div className="flex flex-row justify-between text-sm pt-4">
        <div className="">
          {/* {console.log(post)} */}
          By <span className="text-sky-500">{post.postedBy.name}</span>
        </div>
        <div className="">{getDate(post.postedAt)}</div>
        <div className="flex flex-row gap-2 items-center">
          <FaEye /> {post.views}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
