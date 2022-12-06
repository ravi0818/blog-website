import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context";
import { API_BASE_URL } from "../utils/Constants";

const AdminDashboard = () => {
  const [user, setUser] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response1 = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response1.data.reverse());
      const response2 = await axios
        .get(`${API_BASE_URL}/posts/?status=unapproved`)
        .catch(() => logout());
      console.log(response2);
      setPosts(response2.data.reverse());
    } catch (error) {
      logout();
    }
  };

  const logout = () => {
    alert("Somthing went wrong...\nPlease login again...");
    setUser({ name: "", email: "", isLoggedIn: false });
    localStorage.clear();
    navigate("/");
  };

  const handleApprove = async (id) => {
    try {
      if (
        !window.confirm(
          "Action can't be reverted! Do you want to approve this post?"
        )
      )
        return;
      const response = await axios
        .get(`${API_BASE_URL}/admin/posts/approve/${id}`, {
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
  const handleDelete = async (id) => {
    try {
      if (
        !window.confirm(
          "Action can't be reverted! Do you want to delete this post?"
        )
      )
        return;
      const response = await axios
        .get(`${API_BASE_URL}/admin/posts/delete/${id}`, {
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

  const handleRole = async (id, role) => {
    try {
      if (!window.confirm(`Do you want to change the role to ${role}`)) return;
      const response = await axios
        .get(`${API_BASE_URL}/admin/users/update/?id=${id}&role=${role}`, {
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
    <>
      <div className="lg:grid lg:grid-cols-3 px-4 lg:px-20">
        <div className="lg:col-span-2 overflow-scroll">
          <table className="w-full">
            <thead>
              <tr className="border bg-slate-700 text-white">
                <th className="p-2">Title</th>
                <th className="p-2">Author</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => {
                return (
                  <tr className="border" key={index}>
                    <td className="p-2">
                      <Link to={`/admin/posts/${post._id}`}>
                        <span className="">{post.title}</span>
                      </Link>
                    </td>

                    <td className="p-2 text-center">
                      <span className="">{post.postedBy.name}</span>
                    </td>

                    <td className="p-2 text-center text-white text-sm">
                      <button
                        className="p-1 my-1 rounded bg-green-500"
                        onClick={() => handleApprove(post._id)}
                      >
                        Approve
                      </button>
                      <span className="px-1"></span>
                      <button
                        className="p-1 my-1 rounded bg-red-500"
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
        <div className="lg:col-span-1 overflow-scroll pt-20 lg:pt-0">
          <table className="w-full text-center">
            <thead>
              <tr className="border bg-slate-700 text-white">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr className="border" key={index}>
                    <td className="p-2">
                      <span className="">{user.name}</span>
                    </td>
                    <td className="p-2">
                      <span className="">{user.email}</span>
                    </td>
                    <td className="p-2 text-sm text-white">
                      <button
                        type="radio"
                        className={`p-1 px-2 my-1 rounded lg:rounded-r-none ${
                          user.isAdmin ? "bg-green-500" : "bg-red-500"
                        }`}
                        name={"user-radio-" + index}
                        value={"Admin"}
                        checked={user.isAdmin}
                        onClick={() => handleRole(user._id, "admin")}
                      >
                        Admin
                      </button>
                      <button
                        type="radio"
                        className={`p-1 px-2 my-1 rounded lg:rounded-l-none ${
                          user.isAdmin ? "bg-red-500" : "bg-green-500"
                        }`}
                        name={"user-radio-" + index}
                        value={"User"}
                        checked={!user.isAdmin}
                        onClick={() => handleRole(user._id, "user")}
                      >
                        User
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
