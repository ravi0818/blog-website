import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import { API_BASE_URL } from "../utils/Constants";
import imagePlaceholder from "../utils/placeholder-image.jpg";

const Post = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const dataFetchedRef = useRef(false);
  const fetchData = async () => {
    try {
      const path = location.pathname.split("/")[1];
      console.log(path);
      let response = {};
      if (path === "admin") {
        response = await axios.get(`${API_BASE_URL}/admin/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        response = await axios.get(`${API_BASE_URL}/posts/${id}`);
      }
      if (response.status === 200) {
        setPost(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
    return () => {};
  }, []);

  const getDate = (date) => {
    return new Date(date).toDateString().slice(4);
  };

  return (
    <div className="px-4 lg:px-40 pb-10">
      <div className="text-3xl lg:text-4xl font-semibold">{post.title}</div>
      <div className="flex flex-row gap-6 py-4">
        <div className="">
          By <span className="">{post.postedBy && post.postedBy.name}</span>
        </div>
        <div className="">
          <Link className="text-sky-500">&nbsp;{post.category}&nbsp;</Link>
        </div>

        <div className="">{getDate(post.postedAt)}</div>
        <div className="flex flex-row gap-2 items-center">
          <FaEye /> {post.views}
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <img
          className="lg:p-5 lg:w-8/12 object-cover md:h-96"
          src={post.coverImage || imagePlaceholder}
          onError={(e) => (e.target.src = imagePlaceholder)}
        ></img>
      </div>
      <div className="pt-4">
        <div
          className="prose prose-a:to-blue-700"
          dangerouslySetInnerHTML={{
            __html: post.body,
          }}
        />
      </div>
    </div>
  );
};

export default Post;
