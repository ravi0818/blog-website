import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TinyMCE from "../components/TinyMCE";
import { UserContext } from "../Context";
import { API_BASE_URL, OPTIONS } from "../utils/Constants";
import imagePlaceholder from "../utils/placeholder-image.jpg";

const NewPost = () => {
  const editorRef = useRef(null);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const options = OPTIONS;
  const [image, setImage] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      console.log(user.name);
      const newPostObject = {
        title: event.target[0].value,
        category: event.target[1].value,
        summary: event.target[2].value,
        coverImage: image,
        body: editorRef.current.getContent(),
        postedBy: user.user_id,
      };
      console.warn(newPostObject);
      // return;
      const response = await axios.post(
        `${API_BASE_URL}/posts`,
        newPostObject,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.warn(response);
      if (response.status === 200) {
        alert("Successfully posted!");
        navigate("/dashboard");
      } else {
        alert("Post failed!");
      }
    } catch (error) {
      alert("Somthing went wrong!");
    }
  };

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const postImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();

    formData.append("image", file);

    const res = await axios.post(`${API_BASE_URL}/images`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setImage(() => res.data);
  };

  return (
    <div className="pb-10 px-4 lg:px-20">
      <form style={{ textAlign: "left" }} onSubmit={handleSubmit}>
        <div className="py-3">
          <label className="">Title</label> <br />
          <input
            className="p-2 border w-full"
            type="text"
            placeholder="Enter tilte"
            maxLength={80}
            required
          />
        </div>

        <div className="py-3">
          <label className="">Category </label>
          <span className="text-slate-600">
            (It should not contain space or special characters)
          </span>
          <br />
          <input
            className="p-2 border w-full"
            list="data"
            pattern="[A-Za-z]*$"
            maxLength={30}
            required
          />
          <datalist id="data">
            {options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </datalist>
        </div>
        <div className="py-3">
          <label className="">Summary</label>
          <br />
          <textarea
            className="p-2 border w-full"
            rows={3}
            maxLength={250}
            required
          ></textarea>
        </div>

        <div className="py-3">
          <label className="">Cover Image</label>
          <br />
          <input
            className="p-2 border w-full"
            type={"file"}
            onChange={postImage}
            accept="image/png, image/jpeg, image/jpg"
            required
          />
          <img
            className="pb-5 object-cover h-60 w-full"
            src={image || imagePlaceholder}
            onError={(e) => (e.target.src = imagePlaceholder)}
          ></img>
        </div>

        <div className="py-3">
          <label className="">Body</label>
          <br />
          <TinyMCE ref={editorRef} />
        </div>
        <div className="text-center">
          <button
            className="bg-green-400 p-2 px-5 text-white rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
