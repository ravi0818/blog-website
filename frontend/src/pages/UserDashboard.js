import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { UserContext } from "../Context";
import { API_BASE_URL } from "../utils/Constants";

const UserDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios
        .get(`${API_BASE_URL}/posts/?author=${user.user_id}`)
        .catch(() => logout());
      setPosts(response.data.reverse());
      console.warn(response.data.reverse());
    } catch (error) {
      logout();
    }
  };

  const logout = () => {
    setError(() => "Session expired please login again...");
    setTimeout(() => {
      setError(null);
      setUser({ name: "", email: "", isLoggedIn: false });
      localStorage.clear();
      navigate("/");
    }, 1000);
  };

  const handlePublish = async (id) => {
    try {
      if (!window.confirm("Do you want to publish this post?")) return;
      const response = await axios
        .get(`${API_BASE_URL}/posts/publish/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .catch(() => logout());
      console.log(response);
      fetchData();
    } catch (error) {
      logout();
    }
  };
  const handleUnpublish = async (id) => {
    try {
      if (!window.confirm("Do you want to unpublish this post?")) return;
      const response = await axios
        .get(`${API_BASE_URL}/posts/unpublish/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .catch(() => logout());
      console.log(response);
      fetchData();
    } catch (error) {
      logout();
    }
  };

  const handleDelete = async (id) => {
    try {
      if (
        !window.confirm(
          "Action can't be reverted! Do you want to delete this post?"
        )
      )
        return;
      const response = await axios
        .get(`${API_BASE_URL}/user/posts/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .catch(() => logout());
      fetchData();
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);
  return (
    <div className="px-4 lg:px-20">
      {error && <Alert message={error} type={"error"} />}
      <div className="overflow-scroll">
        <table className="w-full">
          <thead>
            <tr className="border bg-slate-700 text-white">
              <th className="p-2">Title</th>
              <th className="p-2">Views</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => {
              return (
                <tr className="border" key={index}>
                  <td className="p-2 text-center">
                    <span className="">{post.title}</span>
                  </td>
                  <td className="p-2 text-center">
                    <span className="">{post.views}</span>
                  </td>
                  <td className="p-2 text-center">
                    <span
                      className={
                        post.isApproved ? "text-green-400" : "text-red-400"
                      }
                    >
                      {post.isApproved ? "Approved" : "Unapproved"}
                    </span>
                  </td>
                  <td className="p-2 text-center text-sm text-white">
                    <button
                      type="radio"
                      className={`p-1 px-2 my-1 rounded lg:rounded-r-none ${
                        post.isPublished ? "bg-green-500" : "bg-red-500"
                      }`}
                      name={"post-radio-" + index}
                      value={"Admin"}
                      checked={post.isPublished}
                      disabled={!post.isApproved}
                      onClick={() => handlePublish(post._id)}
                    >
                      Published
                    </button>
                    <button
                      type="radio"
                      className={`p-1 px-2 my-1 rounded lg:rounded-l-none ${
                        post.isPublished ? "bg-red-500" : "bg-green-500"
                      }`}
                      name={"post-radio-" + index}
                      value={"User"}
                      checked={!post.isPublished}
                      disabled={!post.isApproved}
                      onClick={() => handleUnpublish(post._id)}
                    >
                      Unpublished
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <Link variant="light" size="sm" to={"/update"} state={post}>
                      📝
                    </Link>
                  </td>
                  <td className="p-2 text-center text-sm text-white">
                    <button
                      className="p-1 px-2 rounded bg-red-500"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
