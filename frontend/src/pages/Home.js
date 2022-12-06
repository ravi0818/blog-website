import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { API_BASE_URL } from "../utils/Constants";

import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const fetchData = async () => {
    try {
      const response1 = await axios.get(
        `${API_BASE_URL}/posts/?status=published`
      );
      const response2 = await axios.get(`${API_BASE_URL}/topposts`);
      if (response1.status === 200 && response2.status === 200) {
        setPosts(response1.data);
        setTopPosts(response2.data);
      } else {
        throw new Error(response1.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <div className="-mt-8">
      <div
        className=""
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1494319827402-c4b839aed26b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80")`,
          backgroundSize: "cover",
          height: "70vh",
        }}
      >
        <div
          className="top-14 w-full h-full flex justify-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
        >
          <div className="w-5/6">
            <div className="text-center mt-2 border-b border-b-black bg-slate-200">
              <input
                className="md:w-11/12 p-2 border-none focus:outline-none bg-transparent"
                type="search"
                placeholder="Search"
              />
              <button className="px-1 lg:px-5 text-xl border-l-2 border-l-black">
                <FaSearch />
              </button>
            </div>
            <div className="lg:grid lg:grid-cols-2">
              <div className="pt-40 text-4xl">Welcome to Blogger!</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-20">
        <div className="py-4">
          <p className="text-3xl">Most Viewed</p>
          <div className="grid lg:grid-cols-4 gap-4">
            {topPosts.map((post, index) => {
              return <PostCard post={post} summary={false} key={index} />;
            })}
          </div>
        </div>
        <div className="py-4 border-b border-blue-700"></div>
        <div className="py-6">
          <p className="text-3xl">New Posts</p>
          <div className="grid lg:grid-cols-3 gap-4">
            {posts.map((post, index) => {
              return <PostCard post={post} summary={true} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
