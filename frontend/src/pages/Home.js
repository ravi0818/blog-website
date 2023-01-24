import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { API_BASE_URL } from "../utils/Constants";

import { FaSearch } from "react-icons/fa";
import SearchResult from "../components/SearchResult";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(null);
  const [skip, setSkip] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/posts/approved?skip=${skip}&&limit=6`
      );
      const newData = response.data;
      console.log(response.data);

      if (response.status === 200) {
        if (response.data.length !== 0) {
          setPosts(newData);
        } else {
          setSkip(skip - 6);
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchTopPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/topposts`);
    if (response.status === 200) {
      setTopPosts(response.data);
    }
  };

  const onSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `${API_BASE_URL}/posts/search?search=${input}`
      );

      if (response.status === 200) {
        console.log(response.data);
        setSearch(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTopPosts();
    fetchData();
    return () => {};
  }, [skip]);

  const onPrev = () => {
    if (skip < 1) return;
    setSkip(skip - 6);
  };
  const onNext = () => {
    setSkip(skip + 6);
  };

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
            <form className="text-center mt-2 border-b border-b-black bg-slate-200">
              <input
                className="md:w-11/12 p-2 border-none focus:outline-none bg-transparent"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Search"
              />
              <button
                className="px-1 lg:px-5 text-xl border-l-2 border-l-black"
                onClick={onSearch}
              >
                <FaSearch />
              </button>
            </form>
            <div className="lg:grid lg:grid-cols-2">
              <div className="pt-40 text-4xl">Welcome to RCoding!</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-20">
        {search && (
          <>
            <SearchResult data={search} />
            <div className="py-4 border-b border-blue-700"></div>
          </>
        )}
        <div className="py-4">
          <p className="text-3xl">Most Viewed</p>
          <div className="grid lg:grid-cols-4 gap-4">
            {topPosts.map((post, index) => {
              return <PostCard post={post} summary={false} key={index} />;
            })}
          </div>
        </div>
        <div className="py-4 border-b border-blue-700"></div>
        <div id="posts" className="py-6">
          <p className="text-3xl">New Posts</p>
          <div className="grid lg:grid-cols-3 gap-4">
            {posts.map((post, index) => {
              return <PostCard post={post} summary={true} key={index} />;
            })}
          </div>
        </div>
        <div className="flex justify-end">
          <a
            href="#posts"
            className="bg-slate-200 py-1 px-4 mx-2"
            onClick={onPrev}
          >
            Prev
          </a>
          <a
            href="#posts"
            className="bg-slate-200 py-1 px-4 mx-2"
            onClick={onNext}
          >
            Next
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
